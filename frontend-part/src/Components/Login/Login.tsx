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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<{ username: boolean; password: boolean }>({ username: false, password: false });
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    // Pass username to dashboard via navigation state
    navigate('/dashboard', { state: { username } });
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
          <label htmlFor="username" className="form-label">Username</label>
          <input
            id="username"
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
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            className="form-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => setTouched(t => ({ ...t, password: true }))}
            required
          />
          {touched.password && !password && <div className="input-message">Password is required.</div>}
        </div>
        {error && <div className="form-error" role="alert">{error}</div>}
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
