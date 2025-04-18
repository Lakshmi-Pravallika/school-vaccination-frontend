import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS for styling

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Menu</h2>
      <ul>
        <li>
          <Link to="/students">Add Student Details</Link>
        </li>
        <li>
          <Link to="/students">Bulk Upload Student Details</Link>
        </li>
        <li>
          <Link to="/students">Update Student Details</Link>
        </li>
        <li>
          <Link to="/students">Register student for drive</Link>
        </li>
        <li>
          <Link to="/students">Display all students</Link>
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
