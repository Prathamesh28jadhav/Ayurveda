import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-700 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Ayurveda Bliss</div>
      <div>
        <a href="/" className="mx-2">Home</a>
        <a href="/chatbot" className="mx-2">Chatbot</a>
        <a href="/login" className="mx-2">Login</a>
        <a href="/register" className="mx-2">Register</a>
      </div>
    </nav>
  );
};

export default Navbar;
