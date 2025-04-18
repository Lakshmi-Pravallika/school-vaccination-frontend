// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    contact: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:8081/api/auth/signup', formData);
      setSuccess(response.data); // assuming it returns "Signup successful"
      setTimeout(() => navigate('/'), 2000); // redirect to login after 2 seconds
    } catch (err) {
      setError(err.response?.data || 'Signup failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Signup</h2>
        <form onSubmit={handleSignup} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username:</label>
            <input
              style={styles.input}
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password:</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Contact:</label>
            <input
              style={styles.input}
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Signup</button>
          {error && <p style={styles.error}>{error}</p>}
          {success && <p style={styles.success}>{success}</p>}
        </form>
        <p style={styles.loginLink}>
          Already a user? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fc',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '2rem 3rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '400px',
  },
  title: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '1rem',
  },
  label: {
    marginBottom: '0.5rem',
    display: 'block',
    color: '#555',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  error: {
    color: 'red',
    marginTop: '1rem',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginTop: '1rem',
    textAlign: 'center',
  },
  loginLink: {
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#333',
  },
};

export default Signup;
