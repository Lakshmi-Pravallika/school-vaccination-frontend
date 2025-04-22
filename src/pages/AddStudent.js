import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css'; 

const AddStudent = () => {
  const [formData, setFormData] = useState({ name: '', studentClass: '', studentId: '' });
  const [success, setSuccess] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [bulkSuccess, setBulkSuccess] = useState('');

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8081/api/status/students', formData);
      setSuccess('🎉 Student added successfully!');
      setFormData({ name: '', studentClass: '', studentId: '' });
    } catch (err) {
      console.error(err);
      setSuccess('❌ Something went wrong.');
    }
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) {
      setBulkSuccess('❌ Please select a CSV file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      await axios.post('http://localhost:8081/api/status/students/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setBulkSuccess(' ✔ Bulk upload successful!');
      setCsvFile(null);
    } catch (error) {
      console.error(error);
      setBulkSuccess('❌ Bulk upload failed.');
    }
  };

  return (
    <div className="add-student-container">
      <div className="add-student-card">
        <h2 className="form-title">Add Single Student</h2>
        <form onSubmit={handleSubmit} className="add-student-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter student name"
            onChange={handleChange}
            required
          />

          <label>Student ID:</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            placeholder="Enter student ID"
            onChange={handleChange}
            required
          />

          <label>Class:</label>
          <input
            type="text"
            name="studentClass"
            value={formData.studentClass}
            placeholder="Enter class"
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
        {success && <p className="success-msg">{success}</p>}
      </div>

      <div className="add-student-card" style={{ marginLeft: '40px' }}>
        <h2 className="form-title">📁 Bulk Upload Students</h2>
        <form onSubmit={handleCsvUpload} className="add-student-form">
          <input type="file" accept=".csv" onChange={handleFileChange} />
          <button type="submit">Upload CSV</button>
        </form>
        {bulkSuccess && <p className="success-msg">{bulkSuccess}</p>}
      </div>
    </div>
  );
};

export default AddStudent;
