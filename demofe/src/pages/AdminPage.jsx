import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import UserManagement from '../components/admin/UserManagement';
import AllPredictions from '../components/admin/AllPredictions';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import './AdminPage.css'; // Import file CSS

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="admin-container">
      <Header />
      <main className="admin-main">
        <div className="admin-header">
          <h1 className="admin-title">Quản trị hệ thống</h1>
          <p className="admin-subtitle">
            Quản lý người dùng và các dự đoán trong hệ thống.
          </p>
        </div>

        <div className="admin-nav">
          <button
            onClick={() => setActiveTab('users')}
            className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
          >
            Quản lý người dùng
          </button>
          <button
            onClick={() => setActiveTab('predictions')}
            className={`admin-tab ${activeTab === 'predictions' ? 'active' : ''}`}
          >
            Danh sách dự đoán
          </button>
        </div>

        {activeTab === 'users' ? <UserManagement /> : <AllPredictions />}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
