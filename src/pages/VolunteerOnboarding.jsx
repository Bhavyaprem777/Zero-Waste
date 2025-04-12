import React, { useState, useEffect } from 'react';

const VolunteerOnboarding = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    organization: '',
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('volunteerList')) || [];
    setVolunteers(stored);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...volunteers, formData];
    localStorage.setItem('volunteerList', JSON.stringify(updatedList));
    setVolunteers(updatedList);
    setFormData({ name: '', email: '', contact: '', organization: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-10 px-4 sm:px-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
        👥 Volunteer / NGO Onboarding
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto mb-8 border border-blue-300">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Onboard a New Volunteer/NGO</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="p-2 border border-gray-300 rounded" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="p-2 border border-gray-300 rounded" />
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required className="p-2 border border-gray-300 rounded" />
          <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization (Optional)" className="p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          ➕ Add Volunteer
        </button>
      </form>

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto border border-blue-300">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">📋 Registered Volunteers/NGOs</h2>
        {volunteers.length === 0 ? (
          <p className="text-gray-500">No volunteers registered yet.</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-100 text-blue-800 text-left">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Contact</th>
                <th className="px-4 py-2 border">Organization</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v, idx) => (
                <tr key={idx} className="hover:bg-blue-50">
                  <td className="px-4 py-2 border">{v.name}</td>
                  <td className="px-4 py-2 border">{v.email}</td>
                  <td className="px-4 py-2 border">{v.contact}</td>
                  <td className="px-4 py-2 border">{v.organization || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VolunteerOnboarding;
