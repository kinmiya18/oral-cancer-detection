import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/predictionService';
import './UserManagement.css'; // Import CSS mới

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
            {users.map((user) => (
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
    </div>
  );
};

export default UserManagement;
