// src/components/Header.jsx
import React from 'react';

const Header = () => (
  <header
    className="fixed top-0 left-64 bg-gradient-to-r from-green-600 via-green-700 to-emerald-800 text-white p-4 shadow-md z-40 rounded-bl-2xl"
    style={{ width: 'calc(100% - 16rem)' }}
  >
    <h1 className="text-2xl font-semibold text-center tracking-wide">
      🌱 FoodBridge – Connecting Surplus to Need
    </h1>
  </header>
);

export default Header;
