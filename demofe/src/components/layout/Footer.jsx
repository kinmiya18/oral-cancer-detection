import React from 'react';
import './Footer.css'; // Import file CSS

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Phát hiện ung thư miệng. Tất cả các quyền được bảo lưu.</p>
    </footer>
  );
};

export default Footer;
