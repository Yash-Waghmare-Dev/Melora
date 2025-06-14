import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const FormButton: React.FC<{
  type?: 'button' | 'submit';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}> = ({
  type = 'button',
  children,
  onClick,
  disabled = false,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="form-button"
  >
    {children}
  </button>
);

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({ email: false, password: false });
  const navigate = useNavigate();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');

    try {
      console.log('Attempting login with:', { email, password });
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        setError(message || 'Login failed. Please try again.');
        return;
      }

      const data = await response.json();
      if (!data.token || !data.user) {
        setError('Invalid server response');
        return;
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navigate to dashboard
      navigate('/dashboard', { 
        state: { 
          username: data.user.username,
          userId: data.user.id 
        } 
      });
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  const handleForgotPassword = (
    e: React.MouseEvent | React.KeyboardEvent
  ) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  return (
    <main className="login-main">
      <h1 className="app-title">Melora</h1>
      <form className="login-form" onSubmit={handleLogin} aria-label="Login Form">
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, email: true }))}
            required
            autoFocus
          />
          {touched.email && !email && <div className="input-message">Email is required.</div>}
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, password: true }))}
            required
          />
          {touched.password && !password && <div className="input-message">Password is required.</div>}
        </div>
        {error && <div className="error-message">{error}</div>}
        <FormButton type="submit">Login</FormButton>
        <div className="login-link">
          <a
            href="/forgot-password"
            onClick={handleForgotPassword}
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
              if (e.key === 'Enter' || e.key === ' ') handleForgotPassword(e);
            }}
          >
            Forgot Password?
          </a>
        </div>
        <div className="login-link">
          <button
            type="button"
            className="form-button"
            style={{ marginTop: 8 }}
            onClick={() => navigate('/register')}
          >
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
