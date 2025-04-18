import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css'; // 👉 Make sure this file exists and is imported

const AddStudent = () => {
  const [formData, setFormData] = useState({ name: '', studentClass: '', studentId: '' });
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <div className="add-student-container">
      <div className="add-student-card">
        <h2 className="form-title">Add Student</h2>
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
    </div>
  );
};

export default AddStudent;
