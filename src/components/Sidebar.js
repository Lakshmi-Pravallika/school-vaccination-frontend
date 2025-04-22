import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; 

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Menu</h2>
      <ul>
        <li>
          <Link to="/students">Add Student Details</Link>
        </li>
        <li>
          <Link to="/viewEditDrive">View/Edit Drive</Link>
        </li>
        <li>
          <Link to="/registerStudentForDrive">Register student for drive</Link>
        </li>
        <li>
          <Link to="/createDrive">Create Vaccination Drive</Link>
        </li>
        <li>
          <Link to="/vaccination-status">Update Vaccination Status</Link>
        </li>
        <li>
          <Link to="/generate-reports">Generate Reports</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
