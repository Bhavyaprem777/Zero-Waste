import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SummaryPage = () => {
  const navigate = useNavigate();

  const donationDataList = JSON.parse(localStorage.getItem('donationDataList')) || [];

  const [showModal, setShowModal] = useState(false);
  const [pickupIndex, setPickupIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    rating: '',
    feedback: '',
  });

  const handleViewDetails = (index) => {
    localStorage.setItem('selectedDonationData', JSON.stringify(donationDataList[index]));
    navigate('/details');
  };

  const handleRequestPickup = (index) => {
    setPickupIndex(index);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleConfirmPickup = () => {
    alert(`Pickup confirmed for ${donationDataList[pickupIndex].foodData.type}!\nThank you for your feedback.`);
    setShowModal(false);
    setFormData({
      name: '',
      email: '',
      contact: '',
      rating: '',
      feedback: '',
    });
  };

  if (donationDataList.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-red-700 drop-shadow-md">Error: No Donation Data Found</h1>
        <p className="text-lg text-center text-gray-600">Please go back and submit your donation details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-green-700 drop-shadow-md">🍲 Donation Summary</h1>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full border border-green-100 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6 text-green-600 text-center">Donation List</h2>

        <table className="min-w-full border-collapse mb-6">
          <thead>
            <tr className="text-left bg-green-100 text-green-700">
              <th className="px-6 py-3 border">Name</th>
              <th className="px-6 py-3 border">Contact</th>
              <th className="px-6 py-3 border">Food Type</th>
              <th className="px-6 py-3 border">Quantity</th>
              <th className="px-6 py-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donationDataList.map((donation, index) => (
              <tr key={index}>
                <td className="px-6 py-3 border">{donation.registrationData.name}</td>
                <td className="px-6 py-3 border">{donation.foodData.contact}</td>
                <td className="px-6 py-3 border">{donation.foodData.type}</td>
                <td className="px-6 py-3 border">{donation.foodData.quantity}</td>
                <td className="px-6 py-3 border">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleViewDetails(index)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRequestPickup(index)}
                      className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
                    >
                      Request Pickup
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-green-700">Confirm Pickup & Give Feedback</h3>

            <div className="space-y-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Contact Number"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <input
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                placeholder="Rating (1-5)"
                type="number"
                min="1"
                max="5"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                placeholder="Feedback"
                className="w-full px-4 py-2 border border-gray-300 rounded"
                rows="3"
              ></textarea>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPickup}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Confirm Pickup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryPage;
