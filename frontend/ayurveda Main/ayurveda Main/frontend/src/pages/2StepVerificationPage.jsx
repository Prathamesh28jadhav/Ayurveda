import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const TwoStepVerificationPage = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");  // ✅ State for errors

    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || "";

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || otp.length !== 6) {
            setError("❌ Please enter a valid 6-digit OTP.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/verify-otp", {
                email,
                otp,
            });

            console.log("✅ Response from server:", response.data);

            // ✅ Display success message
            setMessage("✅ OTP verified successfully! Redirecting to login...");

            // ✅ Store the token in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", response.data.username);

            // ✅ Navigate to login after 2 seconds
            setTimeout(() => navigate("/login"), 2000);

        } catch (err) {
            console.error("❌ Error during OTP verification:", err.response?.data);

            // ✅ Display server error message
            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("❌ Server error. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-4">🔐 2-Step Verification</h2>
                <p className="text-gray-600 text-center mb-4">Enter the OTP sent to your email</p>

                {/* ✅ Display Success and Error Messages */}
                {message && <p className="text-green-500 text-center">{message}</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg mb-4"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-400 text-white py-3 rounded-lg hover:bg-green-500 transition"
                    >
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TwoStepVerificationPage;
