import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/predictionService';
import './UserManagement.css';

const ITEMS_PER_PAGE = 5;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        setError(err.detail || 'Không thể tải danh sách người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = users.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
        <div className="loader">
          <div></div>
        </div>
    );
  }

  if (error) {
    return <div className="alert">{error}</div>;
  }

  return (
      <div className="user-container">
        <div className="user-header">
          <h3 className="user-title">Quản lý người dùng</h3>
          <p className="user-subtitle">Danh sách tất cả người dùng trong hệ thống</p>
        </div>
        <div className="overflow-x-auto">
          <table className="user-table">
            <thead>
            <tr>
              <th>ID</th>
              <th>Tên đăng nhập</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Quyền</th>
              <th>Ngày tạo</th>
            </tr>
            </thead>
            <tbody>
            {currentUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.full_name || '-'}</td>
                  <td>{user.email}</td>
                  <td>
                  <span className={`badge ${user.is_active ? 'badge-active' : 'badge-inactive'}`}>
                    {user.is_active ? 'Hoạt động' : 'Bị khóa'}
                  </span>
                  </td>
                  <td>
                  <span className={`badge ${user.is_admin ? 'badge-admin' : 'badge-user'}`}>
                    {user.is_admin ? 'Admin' : 'Người dùng'}
                  </span>
                  </td>
                  <td>{new Date(user.created_at).toLocaleString('vi-VN')}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
            <div className="pagination-controls">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                &#8592;
              </button>
              {[...Array(totalPages)].map((_, idx) => (
                  <button
                      key={idx}
                      className={currentPage === idx + 1 ? 'active' : ''}
                      onClick={() => goToPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
              ))}
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                &#8594;
              </button>
            </div>
        )}
      </div>
  );
};

export default UserManagement;
