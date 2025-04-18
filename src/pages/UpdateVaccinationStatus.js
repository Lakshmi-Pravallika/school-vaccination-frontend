import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateVaccinationStatus.css'; // Make sure to import the updated CSS

const UpdateVaccinationStatus = () => {
  const [students, setStudents] = useState([]);
  const [vaccinated, setVaccinated] = useState(true);
  const [responseMessage, setResponseMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/status/driveRegisteredStudents')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
      });
  }, []);

  const handleVaccinationStatusUpdate = (studentId, driveId) => {
    axios
      .put(
        `http://localhost:8081/api/status/students/${studentId}/vaccination/${driveId}?vaccinated=${vaccinated}`
      )
      .then(() => {
        setResponseMessage('✅ Vaccination status updated successfully!');
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.studentId === studentId
              ? {
                  ...student,
                  vaccinationStatuses: student.vaccinationStatuses.map((status) =>
                    status.driveId === driveId
                      ? {
                          ...status,
                          vaccinated: true,
                          dateOfVaccination: new Date().toISOString().split('T')[0],
                        }
                      : status
                  ),
                }
              : student
          )
        );
      })
      .catch((error) => {
        setResponseMessage('❌ Failed to update vaccination status. Please try again.');
        console.error('Error updating vaccination status:', error);
      });
  };

  return (
    <div>
      <h2>Update Vaccination Status</h2>
      {responseMessage && <div className="response-message">{responseMessage}</div>}

      <div className="student-container">
        {students.map((student) => (
          <div key={student.studentId} className="student-card">
            <h3>{student.name}</h3>
            <p><strong>ID:</strong> {student.studentId}</p>
            <p><strong>Class:</strong> {student.studentClass}</p>
            <p>
              <strong>Status:</strong>{' '}
              {student.vaccinationStatuses.some((status) => status.vaccinated)
                ? '✅ Vaccinated'
                : '❌ Not Vaccinated'}
            </p>
            <button
              disabled={student.vaccinationStatuses.some((status) => status.vaccinated)}
              onClick={() => handleVaccinationStatusUpdate(student.studentId, 'drive001')}
            >
              {student.vaccinationStatuses.some((status) => status.vaccinated)
                ? 'Already Vaccinated'
                : 'Mark as Vaccinated'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateVaccinationStatus;
