import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './style.css';

import Home from './views/Home';
import NotFound from './views/not-found';
import LoginPage from './pages/LoginPages';
import RegisterPage from './pages/RegisterPage';
import ResetPassword from './pages/ResetPassword';
import UserDashboard from './pages/UserDashboard';


import DlLoginPage from './dlschool/DlLoginPage';
import DlRegisterPage from './dlschool/DlRegisterPage';
import DlResetPassword from './dlschool/DlResetPassword';
import DrivingSchoolDashboard from './dlschool/DrivingSchoolDashboard';


const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/userdashboard" element={<UserDashboard />} />

        <Route path="*" element={<NotFound />} />
        {/* Driving School Routes */}
        <Route path="/dllogin" element={<DlLoginPage />} />
        <Route path="/dlregister" element={<DlRegisterPage />} />
        <Route path="/dlreset" element={<DlResetPassword />} />
        <Route path="/dldashboard" element={<DrivingSchoolDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
