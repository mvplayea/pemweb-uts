"use client";

import { useNavigate } from "react-router";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submit behavior

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    // Hardcode the role
    const role = username === "admin" ? "admin" : "user";

    // Store data in localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);

    // Redirect to dashboard
    navigate("/dashboard");
  };

  // If already logged in, skip login page
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600 text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
          <div className="text-center text-sm mt-4">
            <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
            <span className="mx-2 text-gray-500">|</span>
            <a href="#" className="text-blue-500 hover:underline">Register</a>
          </div>
        </form>
      </div>
    </div>
  );
}
