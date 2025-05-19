import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css'; // Import file CSS

const Header = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
      <header className="header">
        <nav className="nav-container">
          <div className="flex items-center logo-container">
            <Link to="/" className="logo-link">
              Phát hiện ung thư miệng
            </Link>

            {isAuthenticated && (
                <div className="nav-links">
                  <Link to="/dashboard" className="nav-link">Trang chủ</Link>
                  <Link to="/prediction" className="nav-link">Tạo dự đoán</Link>
                  <Link to="/history" className="nav-link">Lịch sử</Link>
                  {isAdmin() && <Link to="/admin" className="nav-link">Quản trị</Link>}
                  {isAdmin() && <Link to="/statistic" className="nav-link">Thống kê</Link>}
                </div>
            )}
          </div>

          <div>
            {isAuthenticated ? (
                <div className="user-info">
                  <span>Xin chào, {user?.full_name || user?.username}</span>
                  <button onClick={handleLogout} className="auth-link">Đăng xuất</button>
                </div>
            ) : (
                <div className="auth-buttons">
                  <Link to="/login" className="auth-link">Đăng nhập</Link>
                  <Link to="/register" className="auth-link">Đăng ký</Link>
                </div>
            )}
          </div>
        </nav>
      </header>
  );
};

export default Header;
