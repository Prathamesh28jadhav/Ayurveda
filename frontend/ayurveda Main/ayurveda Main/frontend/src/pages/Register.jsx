import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // ✅ Step 1: Register the user
      const response = await axios.post("http://localhost:5000/register", formData);
      setMessage(response.data.message);

      // ✅ Step 2: Trigger OTP Immediately After Registration
      const otpResponse = await axios.post("http://localhost:5000/send-otp", {
        email: formData.email
      });

      console.log("✅ OTP Sent:", otpResponse.data);

      // ✅ Step 3: Redirect to 2-Step Verification with email
      navigate("/2-step-verification", { state: { email: formData.email } });

      // ✅ Clear form after registration
      setFormData({ username: "", email: "", password: "" });

    } catch (err) {
      console.error("❌ Error:", err);
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("❌ An error occurred. Please try again.");
      }
    }
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <div className="relative z-10 bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-green-400 mb-6">
          Welcome to Ayurveda Bliss
        </h1>
        {message && <p className="text-green-500 text-center mb-4">{message}</p>}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300"
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300"
            />
          </div>
          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300"
            />
          </div>
          <button type="submit" className="w-full bg-green-400 text-white py-3 rounded-lg">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
