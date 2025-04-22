import React from 'react';
import Login from '../components/auth/Login';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-box">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
