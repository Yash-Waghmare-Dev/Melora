import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Registration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({ username: false, email: false, password: false });
  const navigate = useNavigate();

  const handleRegister = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    navigate('/'); // Redirect to login page
  };

  return (
    <main className="registration-main">
      <h1 className="app-title">Melora</h1>
      <form className="registration-form" onSubmit={handleRegister} aria-label="Registration Form">
        <h2 className="registration-title">Register</h2>
        <div className="form-group">
          <label htmlFor="reg-username" className="form-label">Username</label>
          <input
            id="reg-username"
            className="form-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, username: true }))}
            required
            autoFocus
          />
          {touched.username && !username && <div className="input-message">Username is required.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="reg-email" className="form-label">Email</label>
          <input
            id="reg-email"
            className="form-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            required
          />
          {touched.email && !email && <div className="input-message">Email is required.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="reg-password" className="form-label">Password</label>
          <input
            id="reg-password"
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, password: true }))}
            required
          />
          {touched.password && !password && <div className="input-message">Password is required.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            className="form-input"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}
        <button type="submit" className="form-button">Register</button>
      </form>
    </main>
  );
};

export default Registration;
