import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const FormInput: React.FC<{
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
}> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  required = false,
  autoFocus = false,
}) => (
  <div className="form-group">
    <label htmlFor={id} className="form-label">
      {label}
    </label>
    <input
      id={id}
      className="form-input"
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      autoFocus={autoFocus}
      aria-required={required}
    />
  </div>
);

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
  const navigate = useNavigate();
  console.log(setError);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
      <form className="login-form" onSubmit={handleLogin} aria-label="Login Form">
        <h2 className="login-title">Login</h2>
        <FormInput
          id="username"
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          autoFocus
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}
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
