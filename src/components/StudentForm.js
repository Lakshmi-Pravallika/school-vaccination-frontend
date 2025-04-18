// src/components/StudentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    age: '',
    grade: '',
    parentName: '',
    contactNumber: '',
  });
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/api/status/students', student);
      setMessage('Student added successfully!');
      setStudent({ name: '', studentClass: '', studentId: ''});
    } catch (err) {
      setMessage('Error adding student');
    }
  };

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    if (!csvFile) return;
    const formData = new FormData();
    formData.append('file', csvFile);
    try {
      await axios.post('http://localhost:8081/api/status/students/bulk-upload', formData);
      setMessage('Students uploaded successfully!');
      setCsvFile(null);
    } catch (err) {
      setMessage('CSV upload failed');
    }
  };

  return (
    <div className="student-form-container">
      <h2>Add Student Details</h2>
      <form className="student-form" onSubmit={handleStudentSubmit}>
        <input type="text" name="name" value={student.name} onChange={handleChange} placeholder="Student Name" required />
        <input type="number" name="age" value={student.age} onChange={handleChange} placeholder="Age" required />
        <input type="text" name="grade" value={student.grade} onChange={handleChange} placeholder="Grade" required />
        <input type="text" name="parentName" value={student.parentName} onChange={handleChange} placeholder="Parent Name" />
        <input type="text" name="contactNumber" value={student.contactNumber} onChange={handleChange} placeholder="Contact Number" />
        <button type="submit">Add Student</button>
      </form>

      <hr className="divider" />

      <h3>Bulk Upload Students</h3>
      <form className="csv-upload" onSubmit={handleCsvUpload}>
        <input type="file" accept=".csv" onChange={(e) => setCsvFile(e.target.files[0])} />
        <button type="submit">Upload CSV</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default StudentForm;
