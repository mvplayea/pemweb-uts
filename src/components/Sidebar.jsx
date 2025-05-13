import { useState } from "react"
import { useNavigate } from "react-router"

const Sidebar = ({ items = [], title = "Dashboard" }) => {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate();

  const handleLogout = () => {
    // remove from local storage
    localStorage.removeItem("username");
    navigate("/");
  }

  return (
    <div className={`h-screen bg-gray-800 text-white transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
      <div className="flex justify-end p-4">
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-400 hover:text-white">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {!collapsed && <div className="mb-8 px-4 font-bold text-xl">{title}</div>}

      <div className="px-4">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            text={item.text}
            icon={item.icon}
            onClick={item.onClick}
            active={item.active}
          />
        ))}
      </div>
      <button 
      onClick={handleLogout}
      className="absolute bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  )
}

const SidebarItem = ({ text, icon, onClick, active }) => {
  return (
    <div
      className={`flex items-center py-2 px-2 rounded-md mb-1 cursor-pointer ${
        active ? "bg-gray-700" : "hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <div>{text}</div>
    </div>
  )
}

export default Sidebar
