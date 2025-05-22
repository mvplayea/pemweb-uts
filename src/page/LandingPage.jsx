"use client";

export default function LandingPage() {
  return (
    <>
      <div className="flex justify-center items-center w-full h-screen bg-[url('/wowo.png')] bg-fit bg-no-repeat bg-center">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="text-blue-900">
            <h1>HEADING</h1>
            <h2>subheading</h2>
          </div>
          <div>
            <button
              className="bg-transparent text-indigo-500 border-2 border-indigo-800 px-4 py-1"
              type="submit"
            >
              call to action
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
