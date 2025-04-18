// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm'; // Adjust path if needed
import AddStudent from './pages/AddStudent';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated} {/* Sidebar visible only when authenticated */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={<Login setAuth={setIsAuthenticated} />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/" />
              }
            />
           
             <Route path="/students" element={<AddStudent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
