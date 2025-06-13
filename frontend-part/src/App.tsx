import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Registration from './Components/Registrstion page/Registration';
// import Dashboard from './Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;
