import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import DonorPanel from './pages/DonorPanel';
import ReceiverPanel from './pages/ReceiverPanel';
import GeoMapDashboard from './pages/GeoMapDashboard';
import AdminPanel from './pages/AdminPanel';
import DonorSummary from './pages/DonorSummary';
import DonorDetails from './pages/DonorDetails';
import FoodAvailability from './pages/FoodAvailability';
import AnalysisPage from './pages/AnalysisPage';
import AuthPage from './pages/AuthPage'; // Import AuthPage

import { useState, useEffect } from 'react';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  // Check the authentication state on initial load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set user when the auth state changes (logged in or logged out)
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 ml-60">
          <Header />
          <div className="mt-16 mb-10 p-6">
            <Routes>
              {/* If no user (not logged in), show AuthPage */}
              <Route path="/" element={user ? <Navigate to="/home" /> : <AuthPage />} />

              {/* Home page, only accessible after login */}
              <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />

              {/* Other routes */}
              <Route path="/donor" element={<DonorPanel />} />
              <Route path="/summary" element={<DonorSummary />} />
              <Route path="/details" element={<DonorDetails />} />
              <Route path="/receiver" element={<ReceiverPanel />} />
              <Route path="/geomap" element={<GeoMapDashboard />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/food-availability" element={<FoodAvailability />} />
              <Route path="/analysis" element={<AnalysisPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
