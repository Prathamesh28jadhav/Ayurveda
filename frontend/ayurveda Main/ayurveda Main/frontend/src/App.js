import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import GeneratePage from "./pages/GeneratePage";

import Register from "./pages/Register";
import Login from "./pages/Login";
import TwoStepVerificationPage from "./pages/2StepVerificationPage"; // Import the new page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Default route */}
            <Route path="/" element={<HomePage />} />
            {/* Other routes */}
            <Route path="/home" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* New route for TwoStepVerificationPage */}
            <Route path="/2-step-verification" element={<TwoStepVerificationPage />} />
            <Route path="/generate" element={<GeneratePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
