require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");

// ✅ Import Models
const User = require("./models/User");
const Post = require("./models/post");

const app = express();
app.use(express.json());

// ✅ CORS Configuration
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Multer Configuration for Image Uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// ✅ Nodemailer Configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,         // ✅ SMTP host
  port: parseInt(process.env.EMAIL_PORT), // ✅ SMTP port (465 for secure SSL)
  secure: true,                         // ✅ Use SSL
  auth: {
    user: process.env.EMAIL_USER,       // ✅ Your Gmail ID
    pass: process.env.EMAIL_PASS        // ✅ Your App Password
  },
});



// ✅ Helper: Send OTP
const sendOTP = async (user, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  user.otp = otp;
  await user.save();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "OTP Verification",
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("❌ Error sending email:", error);
      return res.status(500).json({ message: "Error sending OTP" });
    }
    res.status(200).json({ message: "OTP sent successfully" });
  });
};

// ✅ Registration Route
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Use consistent salt rounds for hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Send OTP Route
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate OTP and Save
    const otp = Math.floor(100000 + Math.random() * 900000);
    user.otp = otp;
    await user.save();

    // Send OTP via Nodemailer
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`
    };

    await transporter.sendMail(mailOptions);

    // console.log(`✅ OTP sent to ${email}: ${otp}`);
    res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error("❌ Error sending OTP:", error);
    res.status(500).json({ message: "Failed to send OTP. Please try again." });
  }
});




// ✅ OTP Verification Route
// ✅ OTP Verification Route (Improved)
app.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ Proper OTP Validation with String Conversion
    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "❌ Invalid OTP. Please try again." });
    }

    // ✅ Clear OTP after successful verification
    user.otp = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "✅ OTP verified successfully.",
      token,
      username: user.username
    });

  } catch (error) {
    console.error("❌ Error verifying OTP:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});




// ✅ Login Route


app.post("/login", async (req, res) => {
  try {
    console.log("🔍 Received data:", req.body);   // ✅ Log received data

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ Compare plain password with hashed password from DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "✅ Login successful.",
      token,
      username: user.username
    });

  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error." });
  }
});





// ✅ Create Post Route (Protected)
app.post("/api/posts", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { content } = req.body;
    const username = req.user.username;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    const newPost = new Post({ username, content, image: imagePath });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Error creating post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get All Posts
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("❌ Error fetching posts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get Single Post by ID
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("❌ Error fetching post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Like a Post
app.put("/api/posts/:id/like", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes += 1;
    await post.save();

    res.status(200).json({ message: "Post liked", likes: post.likes });
  } catch (error) {
    console.error("❌ Error liking post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add Comment to Post
app.post("/api/posts/:id/comment", authMiddleware, async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      username: req.user.username,
      text,
      createdAt: new Date()
    });

    await post.save();
    res.status(201).json({ message: "Comment added", comments: post.comments });

  } catch (error) {
    console.error("❌ Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete Post
app.delete("/api/posts/:id", authMiddleware, async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Server Configuration
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
