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

    // find from local storage
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    // Check if the username and password match any stored user
    const user = storedUsers.find(
      (user) => user.username === username && user.password === password
    );

    console.log(user);

    if (!user) {
      alert("Invalid username or password");
      return;
    }
    // Store data in localStorage
    localStorage.setItem("username", user.username);
    localStorage.setItem("roles", user.roles);

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
    <div className="min-h-screen flex items-center justify-center bg-blue-950">
      <div className="bg-blue-100 p-8 rounded-lg shadow-md w-80">
        <img src="/wowo.png" alt="Logo" className="w-48 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-blue-950 mb-6">
          WONDRY
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-blue-950 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900 text-blue-950"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-blue-950 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-900 text-blue-950"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary-900 hover:bg-blue-950 hover:text-primary-900 text-primary-100 font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
