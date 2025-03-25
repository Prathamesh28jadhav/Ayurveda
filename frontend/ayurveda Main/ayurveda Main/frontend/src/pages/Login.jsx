import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Sending data:", formData);  // ✅ Log the form data being sent

    try {
      const response = await axios.post("http://localhost:5000/login", formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });


      console.log("Response:", response);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      setMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      console.error("Login error:", error);

      if (error.response && error.response.data) {
        setMessage(`❌ ${error.response.data.message}`);
      } else {
        setMessage("❌ An error occurred. Please try again.");
      }
    }
  };




  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://source.unsplash.com/random/1920x1080?nature')" }}
      ></div>

      <div className="relative z-10 bg-white bg-opacity-80 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-green-400 mb-6">
          Welcome Back!
        </h2>
        <p className="text-center text-gray-600 mb-4">
          Login to continue your journey with us.
        </p>

        {message && (
          <p className={`text-center mb-4 ${message.includes("❌") ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-400 focus:ring-green-400 sm:text-base"
              required
            />
          </div>

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
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:border-green-400 focus:ring-green-400 sm:text-base"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:bg-green-500 focus:ring-2 focus:ring-green-400 transition-all duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
