import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/authService';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  // Thêm useEffect để xử lý CSS toàn trang khi component mount
  useEffect(() => {
    // Ẩn header và footer nếu cần
    const appHeader = document.querySelector('header');
    const appFooter = document.querySelector('footer');

    if (appHeader) appHeader.style.display = 'none';
    if (appFooter) appFooter.style.display = 'none';

    // Đảm bảo body và html chiếm toàn màn hình
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Cleanup khi component unmount
    return () => {
      if (appHeader) appHeader.style.display = '';
      if (appFooter) appFooter.style.display = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(username, password);
      const userInfo = JSON.parse(localStorage.getItem('user'));
      updateUser(userInfo);
      navigate('/dashboard');
    } catch (err) {
      setError(err.detail || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="login-container">
        {/* Left side - Background image */}
        <div className="login-image-container">
          <div className="login-image"></div>
        </div>

        {/* Right side - Login form */}
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <h1 className="login-title">Đăng nhập</h1>

            {error && <div className="login-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="username">Email</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="input-field"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading} className="login-button">
                {loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>

              <button
                  type="button"
                  className="register-button"
                  onClick={() => navigate('/register')}
              >
                Đăng ký
              </button>

              <div className="forgot-password-container">
                <a
                    href="/forgot-password"
                    className="forgot-password-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/forgot-password');
                    }}
                >
                  Quên mật khẩu?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;