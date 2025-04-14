import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './style.css';

import Home from './views/Home';
import NotFound from './views/not-found';
import LearnerLicenseForm from './pages/LearnerLicenseForm';
import BookingSessions from './pages/BookingSessions';
import LoginPage from './components/LoginPages';
import RegisterPage from './pages/RegisterPage';
import ResetPassword from './pages/ResetPassword';
import DlLoginPage from './dlschool/DlLoginPage';
import DlRegisterPage from './dlschool/DlRegisterPage';
import DlResetPassword from './dlschool/DlResetPassword';
import DrivingSchoolDashboard from './dlschool/DrivingSchoolDashboard';
import ApplicationStatus from './pages/ApplicationStatus';

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
        <Route path="/dlregister" element={<DlRegisterPage />} />
        <Route path="/dlreset" element={<DlResetPassword />} />
        <Route path="/dashboard" element={<DrivingSchoolDashboard />} />
        <Route path="/checkstatus" element={<ApplicationStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
