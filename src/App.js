import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './style.css';

import Home from './views/Home';
import NotFound from './views/not-found';
import LoginPage from './components/LoginPages';
import Register from './components/RegisterPage';
import ResetPassword from './components/ResetPassword';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
