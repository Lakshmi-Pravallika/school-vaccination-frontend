import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ViewEditDrive.css';

const ViewEditDrive = () => {
  const [drives, setDrives] = useState([]);
  const [editingDriveId, setEditingDriveId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/status/drives');
      setDrives(response.data);
    } catch (error) {
      setMessage('❌ Failed to fetch drives.');
    }
  };

  const handleEditClick = (drive) => {
    setEditingDriveId(drive.driveId);
    setEditForm({ ...drive });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8081/api/status/drives/${editingDriveId}`, {
        ...editForm,
        availableDoses: parseInt(editForm.availableDoses),
      });
      setMessage('✅ Drive updated successfully.');
      setEditingDriveId(null);
      fetchDrives();
    } catch (err) {
      setMessage(`❌ ${err.response?.data || 'Failed to update drive.'}`);
    }
  };

  return (
    <div className="drive-container">
      <h2>Upcoming Vaccination Drives</h2>
      {message && (
        <p className={`drive-message ${message.startsWith('✅') ? 'success' : 'error'}`}>{message}</p>
      )}
      <table className="drive-table">
        <thead>
          <tr>
            <th>Drive ID</th>
            <th>Vaccine</th>
            <th>Date</th>
            <th>Available Doses</th>
            <th>Classes</th>
            <th>Completed</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {drives.map((drive) => (
            <tr key={drive.driveId}>
              <td>{drive.driveId}</td>
              <td>{drive.vaccineName}</td>
              <td>
                {editingDriveId === drive.driveId ? (
                  <input
                    type="date"
                    name="driveDate"
                    value={editForm.driveDate}
                    onChange={handleChange}
                    disabled={drive.completed}
                  />
                ) : (
                  drive.driveDate
                )}
              </td>
              <td>
                {editingDriveId === drive.driveId ? (
                  <input
                    type="number"
                    name="availableDoses"
                    value={editForm.availableDoses}
                    onChange={handleChange}
                    disabled={drive.completed}
                  />
                ) : (
                  drive.availableDoses
                )}
              </td>
              <td>{drive.applicableClasses}</td>
              <td>{drive.completed ? 'Yes' : 'No'}</td>
              <td>
                {!drive.completed ? (
                  editingDriveId === drive.driveId ? (
                    <button className="save-btn" onClick={handleSave}>Save</button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEditClick(drive)}>Edit</button>
                  )
                ) : (
                  <button className="disabled-btn" disabled>Completed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEditDrive;
