// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import StudentForm from './components/StudentForm'; // Adjust path if needed
import AddStudent from './pages/AddStudent';
import GenerateReport from './pages/GenerateReport';
import BookDrive from './pages/CreateDrive';
import ViewEditDrive from './pages/ViewEditDrive';
import RegisterStudentForDrive from './pages/RegisterStudentForDrive';
import UpdateVaccinationStatus from './pages/UpdateVaccinationStatus';
import Signup from './components/Signup';

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
             <Route path="/generate-reports" element={<GenerateReport />} />
             <Route path="/createDrive" element={<BookDrive />} />
             <Route path="/viewEditDrive" element={<ViewEditDrive />} />
             <Route path="/registerStudentForDrive" element={<RegisterStudentForDrive />} />
             <Route path="/vaccination-status" element={<UpdateVaccinationStatus />} />
             <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
