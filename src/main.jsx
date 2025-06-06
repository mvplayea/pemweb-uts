import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./components/Dashboard.jsx";
import LoginPage from "./components/LoginPage.jsx";
import UserMenu from "./page/UserMenu.jsx";
import OutletMenu from "./page/OutletMenu.jsx";
import Sidebar from "./components/Sidebar.jsx";
import TransactionMenu from "./page/TransactionMenu.jsx";
import ServiceMenu from "./page/ServiceMenu.jsx";
//import LandingPage from "./page/LandingPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<ServiceMenu />} />
          <Route path="transactions" element={<TransactionMenu />} />
          <Route path="outlets" element={<OutletMenu />} />
          <Route path="users" element={<UserMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
