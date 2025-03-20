require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" })); // Allow CORS for the frontend

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: { type: Number }, // OTP field for storing the latest OTP
});

const User = mongoose.model("User", userSchema);

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper Function: Send OTP
const sendOTP = async (user, res) => {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    await User.updateOne({ email: user.email }, { $set: { otp } });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your OTP for 2-Step Verification",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Error sending OTP. Please try again." });
      }
      res.status(200).json({ message: "OTP sent successfully." });
    });
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Registration Route
app.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    // Send OTP for 2-Step Verification
    await sendOTP(newUser, res);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// OTP Verification Route
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email or OTP is missing." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    res.status(200).json({ message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
   
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
