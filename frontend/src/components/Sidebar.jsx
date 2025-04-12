// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-green-600 via-green-700 to-emerald-800 text-white fixed top-0 left-0 shadow-xl rounded-r-2xl overflow-hidden">
      <div className="text-3xl font-extrabold p-6 border-b border-green-500 tracking-wide text-yellow-100 flex items-center gap-2">
        🍱 <span className="text-white">Food Saver</span>
      </div>
      <nav className="flex flex-col px-6 pt-6 gap-4 text-lg">
        <Link
          to="/"
          className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-800 hover:text-yellow-300 ${
            isActive('/') ? 'bg-green-900 text-yellow-300 font-semibold shadow-md' : ''
          }`}
        >
          🏠 Home
        </Link>
        <Link
          to="/donor"
          className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-800 hover:text-yellow-300 ${
            isActive('/donor') ? 'bg-green-900 text-yellow-300 font-semibold shadow-md' : ''
          }`}
        >
          👤 Donor Panel
        </Link>
        <Link
          to="/receiver"
          className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-800 hover:text-yellow-300 ${
            isActive('/receiver') ? 'bg-green-900 text-yellow-300 font-semibold shadow-md' : ''
          }`}
        >
          📥 Receiver Panel
        </Link>
        <Link
          to="/geomap"
          className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-800 hover:text-yellow-300 ${
            isActive('/geomap') ? 'bg-green-900 text-yellow-300 font-semibold shadow-md' : ''
          }`}
        >
          🗺️ GeoMap Dashboard
        </Link>
        <Link
          to="/admin"
          className={`py-2 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-green-800 hover:text-yellow-300 ${
            isActive('/admin') ? 'bg-green-900 text-yellow-300 font-semibold shadow-md' : ''
          }`}
        >
          🛠️ Admin Panel
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
