// src/components/Footer.jsx
import React from 'react';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="fixed bottom-0 left-64 bg-black text-white py-4 px-6 shadow-md z-40 rounded-tl-2xl"
      style={{ width: 'calc(100% - 16rem)' }}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm">
        
        {/* Left: Contact Info */}
        <div className="text-gray-300 text-center md:text-left">
          📞 +91 9876543210 | ✉️ support@foodsaver.org
        </div>

        {/* Center: Copyright */}
        <div className="text-center">
          © 2025 Food Saver • All Rights Reserved
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-white text-lg justify-center md:justify-end">
          <a href="#" aria-label="Facebook" className="hover:text-blue-400">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-300">
            <FaTwitter />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
