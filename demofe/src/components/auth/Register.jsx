import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api/authService';
import './Register.css'; // Import CSS mới

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      
      // Hiển thị thông báo thành công và chuyển hướng đến trang đăng nhập
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login');
    } catch (err) {
      setError(err.detail || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <h2 className="register-title">Đăng ký tài khoản</h2>

        {error && <div className="register-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="input-field"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input-field"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="full_name">Họ và tên</label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              className="input-field"
              placeholder="Họ và tên (không bắt buộc)"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="input-field"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" disabled={loading} className="register-button">
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>

          <p className="login-text">
            Đã có tài khoản?{' '}
            <a
              href="/login"
              className="login-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
