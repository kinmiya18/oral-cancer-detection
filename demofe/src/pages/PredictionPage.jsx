import React, { useState } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import PredictionForm from '../components/prediction/PredictionForm';
import PredictionResult from '../components/prediction/PredictionResult';
import './PredictionPage.css';

const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePredictionComplete = (result) => {
    setPrediction(result);
  };

  const handleReset = () => {
    setPrediction(null);
  };

  return (
  <div className="page-container">
    <Header />
    <main className="main-content">
      <div className="mb-8">
        <h1 className="heading">Dự đoán ung thư</h1>
        <p className="subtext">
          Tải lên ảnh khoang miệng của bạn để hệ thống AI phân tích và dự đoán nguy cơ ung thư.
        </p>
      </div>

      {prediction ? (
        <PredictionResult prediction={prediction} onReset={handleReset} />
      ) : (
        <PredictionForm onPredictionComplete={handlePredictionComplete} />
      )}

      <div className="note-box">
        <h2 className="note-title">Lưu ý quan trọng</h2>
        <div className="note-text">
          <p>
            Công cụ này chỉ hỗ trợ sàng lọc ban đầu và không thay thế cho chẩn đoán y tế chuyên nghiệp.
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            Nếu bạn gặp bất kỳ triệu chứng đáng ngờ nào, vui lòng tham khảo ý kiến bác sĩ ngay lập tức.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>

  );
};

export default PredictionPage;