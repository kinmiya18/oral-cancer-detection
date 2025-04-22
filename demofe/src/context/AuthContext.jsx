import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, isAuthenticated, isAdmin, logout } from '../api/authService';

// Tạo context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra trạng thái đăng nhập khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        try {
          // Lấy thông tin từ localStorage nếu có
          const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
          
          if (storedUser) {
            setUser(storedUser);
          } else {
            // Nếu không có trong localStorage, lấy từ API
            const userData = await getCurrentUser();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
          handleLogout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Cập nhật thông tin người dùng
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Kiểm tra quyền admin
  const checkIsAdmin = () => {
    return user?.is_admin === true;
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: checkIsAdmin,
    logout: handleLogout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook tùy chỉnh để sử dụng AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
};

export default AuthContext;