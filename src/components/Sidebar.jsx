import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const Sidebar = ({ title = "Dashboard" }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/");
    }

    const storedRole = localStorage.getItem("roles");
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
    navigate("/");
  };

  const sidebarItems = [];

  if (role === "admin") {
    sidebarItems.push(
      {
        text: "Dashboard",
        icon: <img src="/bubble.png" width={32} />,
        onClick: () => navigate("/dashboard"),
      },
      {
        text: "Transactions",
        icon: <img src="/foam1.png" width={32} />,
        onClick: () => navigate("/dashboard/transactions"),
      },
      {
        text: "Service",
        icon: <img src="/produk.png" width={32} />,
        onClick: () => navigate("/dashboard/services"),
      },
      {
        text: "Users",
        icon: <img src="/pengguna.png" width={32} />,
        onClick: () => navigate("/dashboard/users"),
      },
      {
        text: "Outlets",
        icon: <img src="/outlet.png" width={32} />,
        onClick: () => navigate("/dashboard/outlets"),
      }
    );
  } else if (role === "kasir") {
    sidebarItems.push(
      {
        text: "Dashboard",
        icon: <img src="/bubble.png" width={32} />,
        onClick: () => navigate("/dashboard"),
      },
      {
        text: "Transasctions",
        icon: <img src="/foam1.png" width={32} />,
        onClick: () => navigate("/dashboard/transactions"),
      }
    );
  } else if (role === "owner") {
    sidebarItems.push({
      text: "Dashboard",
      icon: <img src="/bubble.png" width={32} />,
      onClick: () => navigate("/dashboard"),
    });
  }

  return (
    <div className="flex w-full flex-start">
      <div
        className={`h-screen bg-blue-950 text-white transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-primary-900"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {!collapsed && (
          <div className="mb-8 px-4 font-bold text-xl">{title}</div>
        )}

        <div className="px-4">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              text={item.text}
              icon={item.icon}
              onClick={item.onClick}
            />
          ))}
        </div>

        <button
          onClick={handleLogout}
          className="absolute bottom-4 left-4 bg-red-800 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <main className="grow">
        <Outlet />
      </main>
    </div>
  );
};

const SidebarItem = ({ text, icon, onClick }) => {
  return (
    <div
      className={`flex items-center py-2 px-2 rounded-md mb-1 cursor-pointer hover:bg-primary-900`}
      onClick={onClick}
    >
      <div className="mr-3">{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default Sidebar;
