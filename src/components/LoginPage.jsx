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
    let role;

    switch (username) {
      case "admin":
        role = "admin";
        break;
      case "kasir":
        role = "kasir";
        break;
      case "owner":
        role = "owner";
        break;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-neutral-800 p-8 rounded-lg shadow-md w-80">
        <img src="/wowo.png" alt="Logo" className="w-48 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-blue-200 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-blue-200 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-blue-200 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-900 hover:bg-primary-500 hover:text-primary-900 text-primary-100 font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
