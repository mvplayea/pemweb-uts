"use client";

export default function Registration() {
  return (
    <>
      <div class="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 class="text-2x1 font-bold text-center text-gray-800 mb-6">
          Registrasi Pelanggan
        </h2>
        <form action="#" method="post">
          <div class="mb-4">
            <label
              for="name"
              class="block text-gray-600 text-sm font-medium mb-2"
            >
              Nama Pelanggan
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border:transparent"
            />
          </div>
          <div class="mb-6">
            <label
              for="phone"
              class="block text-gray-600 text-sm font-medium mb-2"
            >
              Nomor HP
            </label>
            <input
              type="text"
              pattern="[0-9]*"
              inputmode="numeric"
              id="phone"
              name="phone"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div class="mb-4">
            <button
              type="submit"
              class="w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              Tambah
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
