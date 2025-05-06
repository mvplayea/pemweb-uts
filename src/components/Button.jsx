"use client"

const Button = ({ children, onClick, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

