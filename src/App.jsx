import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';

//Routes
import PrivateRoute from './components/ProtectedRoute.jsx';
import Login from './components/Login';
import Profile from './pages/Profile';
import Dashboard from './components/dashboard';
import Home from './pages/Home';
import Service from './pages/Service';
import BusinessTax from './pages/BusinessTax';
import OnlineTaxReturn from './pages/OnlineTaxReturn';
import AboutUs from './pages/AboutUs';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        {/* <Route path="/login" element={<Login />} /> */}
        
        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/services" element={<Service />} />
          <Route path="/business-tax" element={<BusinessTax />} />
          <Route path="/online-tax-return" element={<OnlineTaxReturn />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Route>

        {/* Default route */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;