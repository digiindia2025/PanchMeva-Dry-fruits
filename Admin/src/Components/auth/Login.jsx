import React, { useState } from 'react';
import './Login.css'; // Make sure to create and import a CSS file for styling
import { toast } from 'react-toastify';
import axios from 'axios'; // Make sure axios is installed

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/log-in',
        { email, password },
        { withCredentials: true } // Ensure cookies are sent with the request
      );
      if (response.status === 200) {
        toast.success('Login successful!');
        localStorage.setItem("login", true); // Store login state locally
        window.location.href = '/dashboard'; // Redirect to dashboard
      } else {
        toast.error(response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  };


  return (
    <div className="main-login">
      <div className="login-container">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
              <button
                type="button"
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
