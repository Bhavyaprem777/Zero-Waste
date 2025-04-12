import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonorDetailsPage = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Pending");

  // Get selected donation data from localStorage
  const selectedDonationData = JSON.parse(localStorage.getItem('selectedDonationData'));

  if (!selectedDonationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6">
        <h1 className="text-5xl font-bold mb-10 text-center text-red-700 drop-shadow-md">
          Error: No Donation Data Found
        </h1>
        <p className="text-xl text-center text-gray-600">
          Please go back and select a donation to view details.
        </p>
      </div>
    );
  }

  const { registrationData, foodData } = selectedDonationData;

  const handleBackToSummary = () => {
    navigate('/summary');
  };

  const handleStatusClick = () => {
    // Here you can update the status or perform any other logic when the status is clicked
    alert(`Current Status: ${status}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-6">
      <h1 className="text-5xl font-bold mb-10 text-center text-green-700 drop-shadow-md">
        🍲 Donation Details
      </h1>

      {/* Status Bar */}
      <div
        onClick={handleStatusClick}
        className="bg-blue-600 text-white text-lg py-2 px-4 rounded-full mb-8 cursor-pointer hover:bg-blue-700 transition"
      >
        Donation Status: {status}
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto border border-green-100">
        {/* Donor Details Section */}
        <h2 className="text-3xl font-semibold mb-6 text-green-600 text-center">Donor Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-medium text-green-500">Name:</h3>
            <p className="text-lg text-gray-700">{registrationData.name}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-green-500">Email:</h3>
            <p className="text-lg text-gray-700">{registrationData.email}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-green-500">Donor Type:</h3>
            <p className="text-lg text-gray-700">{registrationData.type}</p>
          </div>
        </div>

        {/* Food Details Section */}
        <h2 className="text-3xl font-semibold mb-6 text-blue-600 text-center">Food Availability Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-medium text-blue-500">Quantity:</h3>
            <p className="text-lg text-gray-700">{foodData.quantity}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-blue-500">Food Type:</h3>
            <p className="text-lg text-gray-700">{foodData.type}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-blue-500">Expiry:</h3>
            <p className="text-lg text-gray-700">{new Date(foodData.expiry).toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-xl font-medium text-blue-500">Contact:</h3>
            <p className="text-lg text-gray-700">{foodData.contact}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium text-blue-500">Address:</h3>
            <p className="text-lg text-gray-700">{foodData.address}</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-medium text-blue-500">Additional Notes:</h3>
            <p className="text-lg text-gray-700">{foodData.notes || 'No additional notes provided.'}</p>
          </div>
        </div>

        {/* Multiple Food Images Section */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium text-blue-500 mb-2">Food Images:</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {foodData.foodImages && foodData.foodImages.length > 0 ? (
              foodData.foodImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Food ${index + 1}`}
                  className="w-96 h-96 object-cover rounded-lg shadow-lg"
                />
              ))
            ) : (
              <p className="text-lg text-gray-600">No food images uploaded.</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0 mt-6">
          <button
            onClick={handleBackToSummary}
            className="bg-green-600 text-white text-lg px-6 py-2 rounded-full hover:bg-green-700 transition w-full sm:w-auto"
          >
            Back to Summary
          </button>
          <button
            onClick={() => setStatus("Accepted")}
            className="bg-blue-600 text-white text-lg px-6 py-2 rounded-full hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Accept Donation
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonorDetailsPage;
