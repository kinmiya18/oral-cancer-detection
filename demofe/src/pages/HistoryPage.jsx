import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PredictionHistory from '../components/prediction/PredictionHistory';
import './HistoryPage.css'; // Import CSS riêng

const HistoryPage = () => {
  return (
    <div className="page-container">
      <Header />
      <main className="main-content">
        <div className="section-header">
          <h1 className="page-title">Lịch sử dự đoán</h1>
          <p className="page-subtext">
            Xem lại tất cả các dự đoán trước đây của bạn và theo dõi kết quả theo thời gian.
          </p>
        </div>

        <PredictionHistory />

        <div className="button-wrapper">
          <a href="/prediction" className="new-prediction-btn">
            Tạo dự đoán mới
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryPage;
