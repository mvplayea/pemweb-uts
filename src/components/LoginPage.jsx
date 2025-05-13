"use client";

export default function LoginPage() {
  return (
    <>
      <div class="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form action="#" method="post">
          <div class="mb-4">
            <label
              for="username"
              class="block text-gray-600 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block text-gray-600 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="mb-4">
            <button
              type="submit"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Login
            </button>
          </div>
          <div class="text-center text-sm">
            <a
              href="#"
              class="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Forgot Password?
            </a>
            <span class="mx-2 text-gray-500">|</span>
            <a
              href="#"
              class="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
