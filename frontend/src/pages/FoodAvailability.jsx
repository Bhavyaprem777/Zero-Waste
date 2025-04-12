import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  shadowSize: [41, 41],
});

const FoodAvailability = () => {
  const navigate = useNavigate();
  const [foodLocations, setFoodLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [distance, setDistance] = useState('5');
  const [type, setType] = useState('');
  const [freshness, setFreshness] = useState('');

  useEffect(() => {
    const locations = [
      { id: 1, name: 'NGO A', address: 'Near Alipiri Road, Tirupati', lat: 13.6372, lon: 79.4192, type: 'Fruits', freshness: 'Fresh' },
      { id: 2, name: 'Restaurant B', address: 'RC Road, Tirupati', lat: 13.6315, lon: 79.4261, type: 'Cooked', freshness: 'Needs refrigeration' },
      { id: 3, name: 'Individual C', address: 'Tirumala Bypass Road, Tirupati', lat: 13.6228, lon: 79.4303, type: 'Veggies', freshness: 'Fresh' },
      { id: 4, name: 'NGO D', address: 'Leela Mahal Circle, Tirupati', lat: 13.6330, lon: 79.4177, type: 'Cooked', freshness: 'Fresh' },
    ];
    setFoodLocations(locations);
  }, []);

  const applyFilters = () => {
    const filtered = foodLocations.filter(loc => {
      const matchType = type ? loc.type === type : true;
      const matchFreshness = freshness ? loc.freshness === freshness : true;
      return matchType && matchFreshness;
    });
    setFilteredLocations(filtered);
  };

  const handleAcceptDonations = () => {
    navigate('/summary');  // Redirects to the DonorSummary page
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6 text-indigo-600">Food Availability Map (Tirupati)</h1>

      {/* Filters Section */}
      <div className="bg-green-100 p-4 mb-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-medium mb-3 text-gray-700">Filter Food Availability</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <select className="p-2 border border-gray-300 rounded-md" value={distance} onChange={(e) => setDistance(e.target.value)}>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
            <option value="20">20 km</option>
          </select>

          <select className="p-2 border border-gray-300 rounded-md" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Food Type</option>
            <option value="Fruits">Fruits</option>
            <option value="Cooked">Cooked</option>
            <option value="Veggies">Veggies</option>
          </select>

          <select className="p-2 border border-gray-300 rounded-md" value={freshness} onChange={(e) => setFreshness(e.target.value)}>
            <option value="">Select Freshness</option>
            <option value="Fresh">Fresh</option>
            <option value="Needs refrigeration">Needs refrigeration</option>
          </select>
        </div>
        <div className="text-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="rounded-md overflow-hidden shadow-md">
        <MapContainer center={[13.6288, 79.4192]} zoom={14} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {filteredLocations.map((location) => (
            <Marker key={location.id} position={[location.lat, location.lon]} icon={markerIcon}>
              <Popup>
                <strong>{location.name}</strong><br />
                {location.address}<br />
                Type: {location.type}<br />
                Freshness: {location.freshness}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-4 sm:space-y-0">
        <button
          onClick={() => window.history.back()}
          className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Go Back to Receiver Panel
        </button>
        <button
          onClick={handleAcceptDonations}
          className="w-full sm:w-auto px-6 py-3 mt-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Accept Donations
        </button>
      </div>
    </div>
  );
};

export default FoodAvailability;
