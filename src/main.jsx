import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Dashboard from './components/Dashboard.jsx'
import LoginPage from './components/LoginPage.jsx'
import CustomerMenu from './page/CustomerMenu.jsx'
import OutletMenu from './page/OutletMenu.jsx'
import Sidebar from './components/Sidebar.jsx'
import TransactionMenu from './page/TransactionMenu.jsx'
import ServiceMenu from './page/ServiceMenu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Sidebar />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<ServiceMenu /> } />
          <Route path="transactions" element={<TransactionMenu /> } />
          <Route path="outlets" element={<OutletMenu /> } />
          <Route path="customers" element={<CustomerMenu /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
