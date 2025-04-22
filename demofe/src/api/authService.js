import axiosInstance from './axios';

// Đăng ký người dùng mới
export const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Có lỗi xảy ra khi đăng ký' };
  }
};

// Đăng nhập
export const login = async (username, password) => {
  try {
    // FastAPI sử dụng OAuth2PasswordRequestForm nên phải gửi dữ liệu dưới dạng form
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await axiosInstance.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Lưu token vào localStorage
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      // Lấy thông tin user sau khi đăng nhập
      const userInfo = await getCurrentUser();
      localStorage.setItem('user', JSON.stringify(userInfo));
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Có lỗi xảy ra khi đăng nhập' };
  }
};

// Lấy thông tin người dùng hiện tại
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Không thể lấy thông tin người dùng' };
  }
};

// Đăng xuất
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Kiểm tra người dùng đã đăng nhập chưa
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Kiểm tra người dùng có phải admin không
export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.is_admin === true;
};