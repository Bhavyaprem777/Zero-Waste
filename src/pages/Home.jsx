import React from 'react';
import foodImg from '../assets/fd1.jpg';
import impactImg from '../assets/impact.jpg'; 
import { useState } from 'react';

const Home = () => {
  const [showModal, setShowModal] = useState(true);
  const [activeForm, setActiveForm] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${activeForm === 'login' ? 'Logged in' : 'Registered'} successfully!`);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pt-20 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-green-700">
              🌱 Welcome to FoodBridge
            </h2>
            <p className="text-lg leading-7">
              We aim to develop a scalable, intelligent web platform that minimizes food wastage by connecting food donors
              — including households, restaurants, caterers, and canteens — with verified recipients such as NGOs,
              shelters, and individuals in need. 
              <br /><br />
              Our platform uses real-time geolocation, AI-driven insights, and automated logistics to ensure surplus food
              reaches those who need it most, efficiently and sustainably.
            </p>
          </div>

          {/* Image */}
          <div className="w-full h-80 bg-green-100 flex items-center justify-center rounded-xl shadow-inner overflow-hidden">
            <img src={foodImg} alt="Donation Visual" className="object-cover w-full h-full rounded-xl" />
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {/* Modal 1 */}
          <div className="bg-green-50 rounded-xl p-6 shadow-md text-center">
            <div className="text-green-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16M4 12h8" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Reduce Food Waste</h4>
            <p className="text-sm text-gray-600">Give leftovers a purpose. Help redirect surplus food to those in need.</p>
          </div>

          {/* Modal 2 */}
          <div className="bg-yellow-50 rounded-xl p-6 shadow-md text-center">
            <div className="text-yellow-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Feed the Needy</h4>
            <p className="text-sm text-gray-600">Support communities and shelters by donating food that's still good.</p>
          </div>

          {/* Modal 3 */}
          <div className="bg-blue-50 rounded-xl p-6 shadow-md text-center">
            <div className="text-blue-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c.864 0 1.5.778 1.5 2s-.636 2-1.5 2-1.5-.778-1.5-2 .636-2 1.5-2z M12 14v6m6-6c0 3-3 6-6 6s-6-3-6-6" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Smart Logistics</h4>
            <p className="text-sm text-gray-600">Track donations and deliveries with real-time geolocation features.</p>
          </div>

          {/* Modal 4 */}
          <div className="bg-pink-50 rounded-xl p-6 shadow-md text-center">
            <div className="text-pink-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold mb-2">Community Impact</h4>
            <p className="text-sm text-gray-600">Together, we create a chain of change to ensure food security for all.</p>
          </div>
        </div>

        {/* Slogan */}
        <div className="mt-12 bg-green-100 rounded-lg p-6 text-center shadow-sm">
          <h3 className="text-xl font-semibold text-green-800">"Every bite counts – share a plate, change a life."</h3>
        </div>

        {/* Hero Impact Image Section */}
        <div className="mt-16 w-full h-[400px] relative rounded-xl overflow-hidden shadow-md">
          <img
            src={impactImg}
            alt="Make a Difference"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-4 md:px-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Make a Difference</h2>
            <p className="text-md md:text-lg max-w-2xl">
              Your action matters. Every donation helps reduce waste and nourish someone in need.
            </p>
          </div>
        </div>

        {/* Extra Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-green-600">Join us in making a difference 🌍</h3>
          <p className="text-md">
            Whether you’re a donor, a receiver, or a volunteer — your role matters. Together, let’s build a community
            that ensures no food goes to waste.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
