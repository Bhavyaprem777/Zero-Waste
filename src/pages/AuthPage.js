import React, { useState } from "react";
import { auth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

// Importing the image from assets folder
import authImage from '../assets/homepage.jpg'; 

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setUser(userCredential.user);
      alert("Registered successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      setUser(userCredential.user);
      alert("Logged in successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT SIDE - IMAGE */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-gray-100">
        <img
          src={authImage} // Using the imported image
          alt="Auth Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <h1 className="text-3xl font-bold mb-6 text-center">ZeroWaste Auth</h1>

        {/* Tab Buttons */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`px-6 py-2 rounded-full ${
              activeTab === "register"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        {/* Conditional Forms */}
        {!user ? (
          activeTab === "login" ? (
            <div className="w-full max-w-sm space-y-4">
              <input
                className="w-full px-4 py-2 border rounded"
                placeholder="Email"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                className="w-full px-4 py-2 border rounded"
                type="password"
                placeholder="Password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={login}
              >
                Login
              </button>
            </div>
          ) : (
            <div className="w-full max-w-sm space-y-4">
              <input
                className="w-full px-4 py-2 border rounded"
                placeholder="Email"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <input
                className="w-full px-4 py-2 border rounded"
                type="password"
                placeholder="Password"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={register}
              >
                Register
              </button>
            </div>
          )
        ) : (
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">Welcome, {user.email}</h2>
            <button
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;
