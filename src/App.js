import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './style.css';

import Home from './views/Home';
import NotFound from './views/not-found';
import LearnerLicenseForm from './pages/LearnerLicenseForm';
import BookingSessions from './pages/BookingSessions';
import DlLoginPage from './dlschool/DlLoginPage';
import LoginPage from './components/LoginPages';
import RegisterPage from './pages/RegisterPage';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './dlschool/DrivingSchoolDashboard';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/llapply" element={<LearnerLicenseForm />} />
        <Route path="/bookingsessions" element={<BookingSessions />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dllogin" element={<DlLoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
