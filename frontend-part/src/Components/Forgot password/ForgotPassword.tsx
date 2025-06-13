import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <main className="forgot-main">
      <form className="forgot-form" onSubmit={handleSubmit} aria-label="Forgot Password Form">
        <h2 className="forgot-title">Forgot Password</h2>
        {submitted ? (
          <div className="forgot-confirmation" role="alert">
            If an account with that email exists, a password reset link has been sent.<br />
            Redirecting to login...
          </div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                className="form-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="form-button">Submit</button>
          </>
        )}
      </form>
    </main>
  );
};

export default ForgotPassword;
