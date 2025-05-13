import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Dashboard from './components/Dashboard.jsx'
import LoginPage from './components/LoginPage.jsx'
import ProductMenu from './page/ProductMenu.jsx'
import CustomerMenu from './page/CustomerMenu.jsx'
import OutletMenu from './page/OutletMenu.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="product" element={<ProductMenu /> } />
          <Route path="outlet" element={<OutletMenu /> } />
          <Route path="customer" element={<CustomerMenu /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
