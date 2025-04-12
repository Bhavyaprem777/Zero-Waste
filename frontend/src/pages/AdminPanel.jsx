import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [donors, setDonors] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(false);
  const [selectedReceiver, setSelectedReceiver] = useState(false);
  const [selectedDonorIndex, setSelectedDonorIndex] = useState(null);
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const donorData = JSON.parse(localStorage.getItem('donationDataList')) || [];
    const receiverData = JSON.parse(localStorage.getItem('receiverDataList')) || [];
    setDonors(donorData);
    setReceivers(receiverData);
  }, []);

  const handleVerifyDonor = (index) => {
    const updatedDonors = [...donors];
    updatedDonors[index].isVerified = true;
    localStorage.setItem('donationDataList', JSON.stringify(updatedDonors));
    setDonors(updatedDonors);
  };

  const handleVerifyReceiver = (index) => {
    const updatedReceivers = [...receivers];
    updatedReceivers[index].isVerified = true;
    localStorage.setItem('receiverDataList', JSON.stringify(updatedReceivers));
    setReceivers(updatedReceivers);
  };

  const handleDonorDetails = () => {
    setSelectedDonor(true);
    setSelectedReceiver(false);
    setSelectedDonorIndex(null);
  };

  const handleReceiverDetails = () => {
    setSelectedReceiver(true);
    setSelectedDonor(false);
    setSelectedReceiverIndex(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10 px-4 sm:px-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-10">👮 Admin Panel</h1>

      {/* Main Card Section */}
      {!selectedDonor && !selectedReceiver && (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Donor Card */}
          <div
            className="bg-white shadow-lg rounded-xl p-6 border border-blue-200 cursor-pointer hover:shadow-xl"
            onClick={handleDonorDetails}
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">🧑‍🍳 Donor Submissions</h2>
            <p className="text-gray-500">Click to view donor details.</p>
          </div>

          {/* Receiver Card */}
          <div
            className="bg-white shadow-lg rounded-xl p-6 border border-green-200 cursor-pointer hover:shadow-xl"
            onClick={handleReceiverDetails}
          >
            <h2 className="text-2xl font-semibold mb-4 text-green-700">📥 Receiver Requests</h2>
            <p className="text-gray-500">Click to view receiver details.</p>
          </div>
        </div>
      )}

      {/* Donor Details Table */}
      {selectedDonor && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-blue-200">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700">🧑‍🍳 Donor Submissions</h2>
            {donors.length === 0 ? (
              <p className="text-gray-500">No donor data available.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-blue-800 text-left">
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Contact</th>
                    <th className="px-4 py-2 border">Food Type</th>
                    <th className="px-4 py-2 border">Quantity</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donation, idx) => (
                    <tr key={idx} className="hover:bg-blue-50">
                      <td className="px-4 py-2 border">{donation.registrationData?.name}</td>
                      <td className="px-4 py-2 border">{donation.foodData?.contact}</td>
                      <td className="px-4 py-2 border">{donation.foodData?.type}</td>
                      <td className="px-4 py-2 border">{donation.foodData?.quantity}</td>
                      <td className="px-4 py-2 border">
                        <button
                          className="text-blue-600 underline mr-2"
                          onClick={() => setSelectedDonorIndex(idx)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mt-8 flex justify-center">
      <button
        className="w-fit px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm whitespace-nowrap shadow-md"
        onClick={() => navigate('/analysis')}
      >
        📊 Food Analysis
      </button>
    </div>
          </div>

       

          {/* Full Donor Detail Section */}
          {selectedDonorIndex !== null && donors[selectedDonorIndex] && (
            <div className="col-span-2 mt-6 bg-white p-6 rounded-lg shadow-md border border-blue-300">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Full Donor Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Name:</strong> {donors[selectedDonorIndex].registrationData?.name}</p>
                <p><strong>Email:</strong> {donors[selectedDonorIndex].registrationData?.email}</p>
                <p><strong>Phone:</strong> {donors[selectedDonorIndex].foodData?.contact}</p>
                <p><strong>Food Type:</strong> {donors[selectedDonorIndex].foodData?.type}</p>
                <p><strong>Quantity:</strong> {donors[selectedDonorIndex].foodData?.quantity}</p>
                <p><strong>Expiry:</strong> {donors[selectedDonorIndex].foodData?.expiry}</p>
              </div>
              {!donors[selectedDonorIndex].isVerified ? (
                <button
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => {
                    handleVerifyDonor(selectedDonorIndex);
                    setSelectedDonorIndex(null);
                  }}
                >
                  ✅ Verify Donor
                </button>
              ) : (
                <p className="text-green-600 font-semibold mt-4">Already Verified ✅</p>
              )}
              <button
                className="ml-4 mt-4 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={() => setSelectedDonorIndex(null)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      )}

      {/* Receiver Details Table */}
      {selectedReceiver && (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-green-200">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">📥 Receiver Requests</h2>
            {receivers.length === 0 ? (
              <p className="text-gray-500">No receiver data available.</p>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-100 text-green-800 text-left">
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Contact</th>
                    <th className="px-4 py-2 border">Address</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {receivers.map((receiver, idx) => (
                    <tr key={idx} className="hover:bg-green-50">
                      <td className="px-4 py-2 border">{receiver.name}</td>
                      <td className="px-4 py-2 border">{receiver.contact}</td>
                      <td className="px-4 py-2 border">{receiver.address}</td>
                      <td className="px-4 py-2 border">
                        {receiver.isVerified ? (
                          <span className="text-green-600">Verified</span>
                        ) : (
                          <button
                            className="text-green-600 underline"
                            onClick={() => handleVerifyReceiver(idx)}
                          >
                            Verify
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Food Analysis Button */}
          
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
