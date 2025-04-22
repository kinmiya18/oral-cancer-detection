import React from 'react';
import Register from '../components/auth/Register';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page-container">
      <div className="register-box">
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
