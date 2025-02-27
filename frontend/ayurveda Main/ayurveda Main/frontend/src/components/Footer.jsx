import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-white p-4 text-center">
      © {new Date().getFullYear()} Ayurveda Bliss. All Rights Reserved.
    </footer>
  );
};

export default Footer;
