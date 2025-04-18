import React, { useState } from 'react';
import axios from 'axios';
import './BookDrive.css';

const BookDrive = () => {
  const [formData, setFormData] = useState({
    driveId: '',
    vaccineName: '',
    driveDate: '',
    availableDoses: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const driveData = {
      ...formData,
      availableDoses: parseInt(formData.availableDoses),
      completed: false,
    };

    try {
      const res = await axios.post('http://localhost:8081/api/status/drives', driveData);
      setMessage('✅ Vaccination drive booked successfully!');
      setFormData({
        driveId: '',
        vaccineName: '',
        driveDate: '',
        availableDoses: '',
        
      });
    } 
    catch (err) {
        const errorMsg =
        err.response && err.response.data
          ? `❌ ${err.response.data}`
          : '❌ Failed to book drive. Please try again.';
      setMessage(errorMsg);
    }
  };

  return (
    <div className="book-drive-container">
      <h2>💉 Book Vaccination Drive</h2>
      {message && <p className="form-message">{message}</p>}

      <form className="drive-form" onSubmit={handleSubmit}>
        <label>
          Drive ID:
          <input type="text" name="driveId" value={formData.driveId} onChange={handleChange} required />
        </label>
        <label>
          Vaccine Name:
          <input type="text" name="vaccineName" value={formData.vaccineName} onChange={handleChange} required />
        </label>
        <label>
          Drive Date:
          <input type="date" name="driveDate" value={formData.driveDate} onChange={handleChange} required />
        </label>
        <label>
          Available Doses:
          <input type="number" name="availableDoses" value={formData.availableDoses} onChange={handleChange} required />
        </label>
       
        <button type="submit">Book Drive</button>
      </form>
    </div>
  );
};

export default BookDrive;
