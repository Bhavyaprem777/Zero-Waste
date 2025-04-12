import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const ReceiverPanel = () => {
  const [role, setRole] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
    ngoId: '',
    restaurantId: '',
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate(); // Use navigate for redirection

  // Handle role change
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    // Reset form data when role changes
    setUserData({
      name: '',
      email: '',
      contact: '',
      address: '',
      ngoId: '',
      restaurantId: '',
    });
  };

  // Handle input change for dynamic fields
  // Handle input change
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('User Data Submitted:', userData);
  
    // Save to localStorage
    const existingReceivers = JSON.parse(localStorage.getItem('receiverDataList')) || [];
    existingReceivers.push({ role, ...userData });
    localStorage.setItem('receiverDataList', JSON.stringify(existingReceivers));
  
    setIsPopupOpen(true); // Open the popup after form submission
  };
  
  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Navigate to "View Food Availability" page
  const handleViewFoodAvailability = () => {
    navigate('/food-availability'); // Use navigate to redirect to the new page
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-green-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-600">Receiver Panel</h1>

      {/* Receiver Type Selection */}
      <div className="mb-4">
        <label htmlFor="role" className="block text-lg font-medium text-gray-700 mb-2">Select Receiver Type:</label>
        <select
          id="role"
          name="role"
          onChange={handleRoleChange}
          value={role}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Receiver Type</option>
          <option value="NGO">NGO</option>
          <option value="Restaurant">Volunteer</option>
          <option value="Individual">Individual</option>
        </select>
      </div>

      {/* Dynamic Form Based on Receiver Type */}
      {role && (
        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Common Fields */}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              value={userData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="contact" className="block text-lg font-medium text-gray-700">Contact Number:</label>
            <input
              id="contact"
              name="contact"
              type="tel"
              value={userData.contact}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your contact number"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-lg font-medium text-gray-700">Address:</label>
            <input
              id="address"
              name="address"
              type="text"
              value={userData.address}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your address"
            />
          </div>

          {/* Role-Specific Fields */}
          {role === 'NGO' && (
            <div>
              <label htmlFor="ngoId" className="block text-lg font-medium text-gray-700">NGO ID:</label>
              <input
                id="ngoId"
                name="ngoId"
                type="text"
                value={userData.ngoId}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your NGO ID"
              />
            </div>
          )}

          {role === 'Restaurant' && (
            <div>
              <label htmlFor="restaurantId" className="block text-lg font-medium text-gray-700">Restaurant ID:</label>
              <input
                id="restaurantId"
                name="restaurantId"
                type="text"
                value={userData.restaurantId}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your Restaurant ID"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 mt-6 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      )}

      {/* "View Food Availability" Button */}
      {role && (
        <div className="mt-4">
          <button
            onClick={handleViewFoodAvailability}
            className="w-full py-3 mt-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            View Food Availability
          </button>
        </div>
      )}

      {/* Popup Confirmation */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-green-600">Form Submitted Successfully!</h2>
            <p className="mt-4 text-gray-700">Thank you for submitting your information. You can now view food availability.</p>
            <button
              onClick={closePopup}
              className="mt-6 w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiverPanel;
