import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonorPanel = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isFoodPosted, setIsFoodPosted] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    type: '',
  });

  const [foodData, setFoodData] = useState({
    quantity: '',
    type: '',
    expiry: '',
    foodImages: [],
    contact: '',
    address: '',
    notes: '',
  });

  const [estimatedWeight, setEstimatedWeight] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  const handleFoodSubmit = (e) => {
    e.preventDefault();
    setIsFoodPosted(true);
    const completeDonation = { registrationData, foodData };

    const existingData = JSON.parse(localStorage.getItem('donationDataList')) || [];
    const updatedData = [...existingData, completeDonation];
    localStorage.setItem('donationDataList', JSON.stringify(updatedData));
    localStorage.setItem('selectedDonationData', JSON.stringify(completeDonation));

    navigate('/summary');
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const selectedFile = files[0];

    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch("http://localhost:8000/estimate-weight/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setEstimatedWeight(data.estimated_weight);

      setFoodData((prev) => ({
        ...prev,
        quantity: `${data.estimated_weight} kg (estimated)`
      }));
    } catch (error) {
      console.error("Weight estimation failed", error);
    }
  };

  useEffect(() => {
    if (isRegistered && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Log the coordinates for debugging
          console.log("Coordinates:", latitude, longitude);
  
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
  
          const location = data.display_name || `Lat: ${latitude}, Lon: ${longitude}`;
          
          // Set the location dynamically
          setFoodData((prev) => ({
            ...prev,
            address: location,
          }));
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
          // In case of error, set default location (like Hyderabad or an empty string)
          setFoodData((prev) => ({
            ...prev,
            address: "Unable to fetch location",
          }));
        }
      );
    }
  }, [isRegistered]);
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-6">
      <h1 className="text-4xl font-bold mb-10 text-center text-green-700 drop-shadow-md text-xl">🍲 Donor Panel</h1>

      {!isRegistered && (
        <form onSubmit={handleRegister} className="bg-white shadow-xl rounded-2xl p-8 max-w-xl mx-auto border border-green-100 text-lg">
          <h2 className="text-2xl font-semibold mb-6 text-green-600 text-center">Register as a Donor</h2>

          <input
            type="text"
            placeholder="Name"
            value={registrationData.name}
            onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={registrationData.email}
            onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />
          <select
            value={registrationData.type}
            onChange={(e) => setRegistrationData({ ...registrationData, type: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-6"
          >
            <option value="">Select Donor Type</option>
            <option value="restaurant">Restaurant</option>
            <option value="individual">Individual</option>
            <option value="organization">Organization</option>
          </select>

          <div className="flex justify-center">
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition">
              Register
            </button>
          </div>
        </form>
      )}

      {isRegistered && !isFoodPosted && (
        <form onSubmit={handleFoodSubmit} className="bg-white shadow-xl rounded-2xl p-8 max-w-xl mx-auto mt-10 border border-blue-100 text-lg">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">Post Food Availability</h2>

          <input
            type="text"
            placeholder="Contact Number"
            value={foodData.contact}
            onChange={(e) => setFoodData({ ...foodData, contact: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />
          <textarea
            placeholder="Address"
            value={foodData.address}
            onChange={(e) => setFoodData({ ...foodData, address: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />
          <input
            type="text"
            placeholder="Quantity (e.g. 10 meals)"
            value={foodData.quantity}
            onChange={(e) => setFoodData({ ...foodData, quantity: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />
          <select
            value={foodData.type}
            onChange={(e) => setFoodData({ ...foodData, type: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          >
            <option value="">Select Food Type</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
            <option value="perishable">Perishable</option>
            <option value="non-perishable">Non-Perishable</option>
          </select>
          <input
            type="datetime-local"
            value={foodData.expiry}
            onChange={(e) => setFoodData({ ...foodData, expiry: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 border border-gray-300 rounded-xl mb-4"
          />

          {estimatedWeight && (
            <div className="mt-4 text-green-600 font-medium">
              📏 Estimated Weight: {estimatedWeight} kg
            </div>
          )}

          <textarea
            placeholder="Additional Notes (optional)"
            value={foodData.notes}
            onChange={(e) => setFoodData({ ...foodData, notes: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-xl mb-6"
          />

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
              Submit Food
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default DonorPanel;
