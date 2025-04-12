import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Status colors
const foodStatusColors = {
  available: 'green',
  nearExpiry: 'orange',
  expired: 'red',
};

const GeoMapDashboard = () => {
  const tirupatiCoordinates = { lat: 13.6288, lon: 79.4192 };

  const [foodDonations] = useState([
    {
      id: 1,
      name: 'Fresh Biryani Pack',
      lat: 13.6288,
      lon: 79.4192,
      status: 'available',
    },
    {
      id: 2,
      name: 'Vegetable Curry Box',
      lat: 13.6305,
      lon: 79.4245,
      status: 'available',
    },
    {
      id: 3,
      name: 'Near Expiry Milk',
      lat: 13.6250,
      lon: 79.4180,
      status: 'nearExpiry',
    },
    {
      id: 4,
      name: 'Near Expiry Bread Loaf',
      lat: 13.6320,
      lon: 79.4220,
      status: 'nearExpiry',
    },
    {
      id: 5,
      name: 'Already Picked Rice',
      lat: 13.6345,
      lon: 79.4160,
      status: 'expired',
    },
    {
      id: 6,
      name: 'Spoiled Curry Box',
      lat: 13.6275,
      lon: 79.4125,
      status: 'expired',
    },
  ]);

  // Function to create a colored marker
  const getMarkerIcon = (status) => {
    const color = foodStatusColors[status] || 'blue';
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color}; width: 18px; height: 18px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-4">
        Tirupati, Andhra Pradesh
      </h2>

      {/* Legend */}
      <div className="flex justify-center space-x-8 mb-4">
        {Object.entries(foodStatusColors).map(([status, color]) => (
          <div key={status} className="flex items-center space-x-2">
            <div
              style={{
                backgroundColor: color,
                width: 18,
                height: 18,
                borderRadius: '50%',
              }}
            ></div>
            <span className="text-gray-800 font-medium">
              {status === 'available'
                ? 'Fresh & Available'
                : status === 'nearExpiry'
                ? 'Near Expiry'
                : 'Already Picked / Expired'}
            </span>
          </div>
        ))}
      </div>

      {/* Map */}
      <MapContainer
        center={[tirupatiCoordinates.lat, tirupatiCoordinates.lon]}
        zoom={14}
        scrollWheelZoom={true}
        style={{ height: '525px', width: '100%' }}
      >
        {/* Tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers */}
        {foodDonations.map((donation) => (
  <Marker
    key={donation.id}
    position={[donation.lat, donation.lon]}
    icon={getMarkerIcon(donation.status)}
    eventHandlers={{
        click: () => {
            if (donation.status === 'available' || donation.status === 'nearExpiry') {
              // Hardcoded location: Nagplatla, Tirupati
              const userLat = 13.6282;
              const userLon = 79.4190;
          
              const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${donation.lat},${donation.lon}&travelmode=driving`;
              window.open(mapsUrl, '_blank');
            } else {
              alert('This donation is already picked or expired.');
            }
          }
          
    }}
  >
    <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
      {donation.name}
    </Tooltip>
  </Marker>
))}

      </MapContainer>
    </div>
  );
};

export default GeoMapDashboard;
