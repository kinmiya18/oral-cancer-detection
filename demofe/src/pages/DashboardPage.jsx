import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../api/authService';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import './DashboardPage.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        setError('Không thể tải thông tin người dùng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main className="page-main">
        <div className="card">
          <div className="card-header">
            <h1 className="page-title">Bảng điều khiển</h1>
            <p className="page-subtext">
              Chào mừng trở lại, {user?.full_name || user?.username}
            </p>
          </div>

          {error && (
            <div className="alert-error" role="alert">
              <p>{error}</p>
            </div>
          )}

          <div className="details-section">
            <dl>
              <div className="detail-row">
                <dt className="detail-label">Tên đầy đủ</dt>
                <dd className="detail-value">{user?.full_name || 'Chưa cập nhật'}</dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">Tên đăng nhập</dt>
                <dd className="detail-value">{user?.username}</dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">Email</dt>
                <dd className="detail-value">{user?.email}</dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">Vai trò</dt>
                <dd className="detail-value">
                  <span className={`badge ${user?.is_admin ? 'admin' : 'user'}`}>
                    {user?.is_admin ? 'Quản trị viên' : 'Người dùng'}
                  </span>
                </dd>
              </div>
              <div className="detail-row">
                <dt className="detail-label">Ngày tham gia</dt>
                <dd className="detail-value">
                  {user?.created_at ? new Date(user.created_at).toLocaleString('vi-VN') : 'Không có thông tin'}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="grid-cards">
          <div className="card">
            <div className="card-inner">
              <h3 className="card-heading">Tạo dự đoán mới</h3>
              <p className="card-desc">Tải lên ảnh để phân tích và nhận kết quả dự đoán.</p>
              <a href="/prediction" className="btn-primary">Đi đến trang dự đoán</a>
            </div>
          </div>

          <div className="card">
            <div className="card-inner">
              <h3 className="card-heading">Lịch sử dự đoán</h3>
              <p className="card-desc">Xem lại các kết quả dự đoán trước đây của bạn.</p>
              <a href="/history" className="btn-primary">Xem lịch sử dự đoán</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
