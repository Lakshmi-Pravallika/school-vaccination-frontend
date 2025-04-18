import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Sidebar from './Sidebar'; // Import Sidebar component
import './Dashboard.css'; // Add custom styles for Dashboard

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalStudents: 0,
    vaccinatedStudents: 0,
    percentageVaccinated: 0,
    upcomingDrives: [],
  });
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Set this to false

  useEffect(() => {
    axios
      .get('http://localhost:8081/api/status/dashboard')
      .then((res) => {
        console.log('📊 Dashboard Metrics:', res.data);
        setMetrics(res.data);
      })
      .catch((err) => console.error('Dashboard error:', err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/';
  };

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const theme = darkMode ? styles.dark : styles.light;

  const chartData = [
    { name: 'Total', value: metrics.totalStudents },
    { name: 'Vaccinated', value: metrics.vaccinatedStudents },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {menuOpen && <Sidebar />} {/* Sidebar visible when menuOpen is true */}

      {/* Main content area */}
      <div
        style={{
          ...styles.container,
          ...theme.wrapper,
          marginLeft: menuOpen ? '250px' : '0',
        }}
      >
        <header style={{ ...styles.header, ...theme.header }}>
          <div style={styles.headerLeft}>
            <button onClick={toggleMenu} style={styles.menuToggle}>
              ☰
            </button>
            <h2 style={theme.text}>📊 Dashboard</h2>
          </div>
          <div>
            <button style={styles.toggleBtn} onClick={toggleTheme}>
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <section className="metrics" style={styles.metricsGrid}>
          <div style={{ ...styles.card, ...theme.card }}>
            <h3 style={theme.text}>Total Students</h3>
            <p style={styles.number}>{metrics.totalStudents}</p>
          </div>
          <div style={{ ...styles.card, ...theme.card }}>
            <h3 style={theme.text}>Vaccinated Students</h3>
            <p style={styles.number}>{metrics.vaccinatedStudents}</p>
          </div>
          <div style={{ ...styles.card, ...theme.card }}>
            <h3 style={theme.text}>Vaccination %</h3>
            <p style={styles.number}>{metrics.percentageVaccinated}%</p>
          </div>
          <div style={{ ...styles.card, ...theme.card }}>
            <h3 style={theme.text}>Upcoming Drives</h3>
            {metrics.upcomingDrives && metrics.upcomingDrives.length > 0 ? (
              <ul style={styles.driveList}>
                {metrics.upcomingDrives.map((d, i) => (
                  <li key={i} style={theme.text}>
                    💉 {d.vaccineName} on {d.driveDate}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={theme.text}>No upcoming drives</p>
            )}
          </div>
        </section>

        <section style={{ ...styles.chartContainer, ...theme.card }}>
          <h3 style={theme.text}>Vaccination Chart</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#555' : '#ccc'} />
              <XAxis dataKey="name" stroke={darkMode ? '#fff' : '#000'} />
              <YAxis stroke={darkMode ? '#fff' : '#000'} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    padding: '2rem',
    transition: 'all 0.3s ease-in-out',
  },
  container: {
    flex: 1,
    boxSizing: 'border-box',
    overflow: 'auto',
    transition: 'margin-left 0.3s ease-in-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  menuToggle: {
    fontSize: '1.5rem',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    marginLeft: '4px',
    cursor: 'pointer',
  },
  logoutBtn: {
    backgroundColor: '#f44336',
    border: 'none',
    padding: '0.5rem 1rem',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '1rem',
  },
  toggleBtn: {
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  metricsGrid: {
    top: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '1rem',
    width: '100%',
  },
  card: {
    padding: '1.0rem',
    borderRadius: '9px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    animation: 'fadeIn 1s ease-in',
  },
  driveList: {
    paddingLeft: '1rem',
    
  },
  number: {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#444',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '5px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    height: '250px', // Adjust this
    width: '60%',    // Optional: control width too
    margin: '0 auto' // Center it horizontally
  },
  
  light: {
    wrapper: { backgroundColor: '#f5f7fa' },
    header: { backgroundColor: '#1976d2', color: '#fff' },
    card: { backgroundColor: '#fff', color: '#000' },
    text: { color: '#000' },
  },
  dark: {
    wrapper: { backgroundColor: '#1c1c1c' },
    header: { backgroundColor: '#333', color: '#fff' },
    card: { backgroundColor: '#2c2c2c', color: '#fff' },
    text: { color: '#fff' },
  },
};

export default Dashboard;
