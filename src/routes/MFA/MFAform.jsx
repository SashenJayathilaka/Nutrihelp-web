import React, { useState, useContext, useEffect } from 'react';
 
import './MFAform.css'; 
 
import { useNavigate, useLocation } from "react-router-dom";
 
import { UserContext } from "../../context/user.context";
 
const MFAform = () => {
 
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendStatus, setResendStatus] = useState('');
 
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext); 
 
  const location = useLocation();
  const { email, password } = location.state || {}; 
 
  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
 
    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`mfa-input-${index + 1}`);
      if (nextInput) {
 
        nextInput.focus();
 
      }
 
    }
 
  };
 
  const handleMfaVerification = async (e) => {
 
    e.preventDefault();
    const fullCode = code.join('');
    const mfa_token = fullCode; 
 
    try {
 
      const response = await fetch('http://localhost:80/api/login/mfa', {
 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, mfa_token }), 
 
      });
 
      if (response.ok) {
 
        const data = await response.json();
        setCurrentUser(data.user);
        navigate("/"); 
        alert("MFA verification successful!");
 
      } else {
 
        const data = await response.json();
        alert(data.error || 'Failed to verify MFA token');
 
      }
 
    } catch (error) {
 
      console.error('Error verifying MFA token:', error.message);
      setError("Failed to verify MFA token. An error occurred.");
 
    }
 
  };
 
  const handleResendCode = async () => {
    alert("Code resent to your email.");
    setCountdown(10);
  };
 
  useEffect(() => {
    let timer;
    if (countdown > 0) {
 
      timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
 
    }
    return () => clearTimeout(timer);
 
  }, [countdown]);
 
  return (
    <div className="mfa-auth-wrapper">
      <div className="mfa-card-container"> 
        <div className="mfa-auth-card">
          <h2 className="mfa-title">Multi-Factor Authentication</h2>
          <p className="mfa-subtitle">Please enter the 6-digit code sent to your email</p>
 
          {error && <div>{error}</div>}
          <form onSubmit={handleMfaVerification} autoComplete="off">
            <div className="mfa-input-container">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`mfa-input-${index}`}
                  className="mfa-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value.replace(/\D/, ''))}
                />
              ))}
            </div>
 
            <p className="resend-text">
              Didn’t get the code?{' '}
              <span
                className="resend-link"
                onClick={handleResendCode}
                disabled={countdown > 0}
              >
                {countdown > 0 ? `Resending Code in ${countdown} seconds` : 'Resend code'}
              </span>
            </p>
 
            <button className="mfa-submit-button" type="submit">Verify account</button>
          </form>
        </div>
      </div>
    </div>
  );  
};
 
export default MFAform;
 