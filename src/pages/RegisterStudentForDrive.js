import React, { useState } from 'react';
import axios from 'axios';
import './RegisterStudentForDrive.css';

const RegisterStudentForDrive = () => {
  const [studentId, setStudentId] = useState('');
  const [driveId, setDriveId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    try {
      const response = await axios.post(
        `http://localhost:8081/api/status/${studentId}/register/${driveId}`
      );
      setMessage(response.data);
    } catch (err) {
      setError(true);
      setMessage('❌ Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-drive-container">
      <h2>Register Student for Drive</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Drive ID:</label>
          <input
            type="text"
            value={driveId}
            onChange={(e) => setDriveId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>

      {message && (
        <div className={`response-message ${error ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default RegisterStudentForDrive;
