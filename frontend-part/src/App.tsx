import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
// import Dashboard from './Dashboard';
// import Register from './Register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
