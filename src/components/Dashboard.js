import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [metrics, setMetrics] = useState({
        totalStudents: 0,
        vaccinatedStudents: 0,
        percentageVaccinated: 0,
        upcomingDrives: [],
    });

    // Fetch dashboard data when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8081/api/status/dashboard') // Replace with your backend URL if different
            .then((response) => {
                console.log('API Response:', response.data);
                setMetrics(response.data);  // Store fetched data in state
            })
            .catch((error) => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-metrics">
                <div className="metric">
                    <h3>Total Students</h3>
                    <p>{metrics.totalStudents}</p>
                </div>
                <div className="metric">
                    <h3>Vaccinated Students</h3>
                    <p>{metrics.vaccinatedStudents}</p>
                </div>
                <div className="metric">
                    <h3>Vaccination Percentage</h3>
                    <p>{metrics.percentageVaccinated}%</p>
                </div>
                <div className="metric">
                    <h3>Upcoming Drives</h3>
                    {metrics.upcomingDrives.length > 0 ? (
                        <ul>
                            {metrics.upcomingDrives.map((drive, index) => (
                                <li key={index}>
                                    <strong>{drive.vaccineName}</strong> - {drive.driveDate}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No upcoming drives</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
