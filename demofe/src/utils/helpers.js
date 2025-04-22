/**
 * Format ngày giờ theo locale Việt Nam
 * @param {string|Date} dateString - Chuỗi hoặc đối tượng ngày
 * @returns {string} - Chuỗi ngày đã định dạng
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('vi-VN');
};

/**
 * Format số thành phần trăm
 * @param {number} value - Giá trị từ 0-1
 * @param {number} decimals - Số chữ số thập phân
 * @returns {string} - Chuỗi phần trăm đã định dạng
 */
export const formatPercent = (value, decimals = 2) => {
  return (value * 100).toFixed(decimals) + '%';
};

/**
 * Kiểm tra định dạng email hợp lệ
 * @param {string} email - Email cần kiểm tra
 * @returns {boolean} - true nếu email hợp lệ
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Lấy tên file từ đường dẫn
 * @param {string} path - Đường dẫn file
 * @returns {string} - Tên file
 */
export const getFileName = (path) => {
  if (!path) return '';
  return path.split('/').pop();
};

/**
 * Kiểm tra định dạng file ảnh hợp lệ
 * @param {File} file - File cần kiểm tra
 * @returns {boolean} - true nếu file là ảnh hợp lệ
 */
export const isValidImageFile = (file) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'];
  return file && validTypes.includes(file.type);
};

/**
 * Giới hạn kích thước văn bản
 * @param {string} text - Văn bản cần giới hạn
 * @param {number} maxLength - Độ dài tối đa
 * @returns {string} - Văn bản đã giới hạn
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};