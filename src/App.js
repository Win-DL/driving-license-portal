import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import './style.css';

import Home from './views/Home';
import NotFound from './views/not-found';
import LearnerLicenseForm from './components/LearnerLicenseForm';
import BookingSessions from './components/BookingSessions';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/llapply" element={<LearnerLicenseForm />} />
        <Route path="/bookingsessions" element={<BookingSessions />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
}

export default App;
