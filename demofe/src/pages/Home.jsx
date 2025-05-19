import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "./Home.css"
const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
   <div className="home-container">
  {/* Hero Section */}
  <div className="hero-section">
    <div className="hero-overlay"></div>
    <div className="hero-content">
      <h1 className="hero-title">Phát hiện sớm ung thư miệng</h1>
      <p className="hero-subtitle">
        Hệ thống trí tuệ nhân tạo hỗ trợ phát hiện sớm dấu hiệu ung thư miệng qua ảnh
      </p>
      <div className="hero-buttons">
        {isAuthenticated ? (
          <Link to="/prediction" className="hero-button primary">
            Phân tích ảnh ngay
          </Link>
        ) : (
          <div className="space-x-4">
            <Link to="/login" className="hero-button primary">Đăng nhập</Link>
            <Link to="/register" className="hero-button secondary">Đăng ký</Link>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Features Section */}
  <div className="features-section">
    <h2 className="feature-title">Phát hiện sớm</h2>
    <p className="feature-heading">Công nghệ AI tiên tiến</p>
    <p className="feature-description">
      Hệ thống sử dụng mô hình học sâu để phân tích ảnh và phát hiện các dấu hiệu bất thường
    </p>
  </div>

  {/* CTA Section */}
  <div className="cta-section">
    <h2 className="cta-title">
      <span>Sẵn sàng bắt đầu? </span>
      <span className="cta-highlight">Tạo tài khoản miễn phí ngay hôm nay</span>
    </h2>
    <div className="cta-buttons">
      <Link to={isAuthenticated ? "/prediction" : "/register"} className="cta-button primary">
        {isAuthenticated ? 'Phân tích ảnh ngay' : 'Đăng ký ngay'}
      </Link>
    </div>
  </div>
</div>

  );
};

export default Home;