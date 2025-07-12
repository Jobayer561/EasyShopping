import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-white text-gray-700">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row lg:justify-between gap-4 items-center text-center lg:text-left">
        {/* Left: Links */}
        <div className="flex gap-6 text-sm font-medium">
          <Link to="/about" className="hover:text-[#8F00FF] transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-[#8F00FF]	] transition">
            Contact Us
          </Link>
        </div>

        {/* Center: Copyright */}
        <p className="text-sm">© All Rights Reserved 2025</p>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-4 text-2xl justify-center text-gray-700">
          <a href="#" className="hover:text-[#1877F2] transition">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-[#833AB4] transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-[#0A66C2] transition">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
