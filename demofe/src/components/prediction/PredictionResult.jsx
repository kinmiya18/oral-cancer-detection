import React from 'react';
import './PredictionResult.css';

const PredictionResult = ({ prediction, onReset }) => {
  if (!prediction) return null;

  const formattedDate = new Date(prediction.created_at).toLocaleString('vi-VN');
  const isCancer = prediction.prediction_result;
  const confidencePercent = (prediction.confidence * 100).toFixed(2);

  return (
    <div className="prediction-container">
      <div className="prediction-header">
        <h3 className="prediction-title">Kết quả phân tích</h3>
        <p className="prediction-date">Kết quả dự đoán vào {formattedDate}</p>
      </div>
      <div className="prediction-section">
        <dl>
          <div className="prediction-row row-alt">
            <dt className="prediction-label">Ảnh phân tích</dt>
            <dd className="prediction-value">
              <div className="h-48 w-full sm:w-64 overflow-hidden rounded-lg">
                {/* <img 
                  src={`${import.meta.env.VITE_API_URL}/${prediction.image_path}`} 
                  alt="Analyzed" 
                  className="h-full w-full object-contain"
                /> */}
              </div>
            </dd>
          </div>

          <div className={`prediction-row ${isCancer ? 'result-positive' : 'result-negative'}`}>
            <dt className="prediction-label">Kết quả</dt>
            <dd className="prediction-value">
              {isCancer ? 'Có dấu hiệu ung thư' : 'Không phát hiện dấu hiệu ung thư'}
            </dd>
          </div>

          <div className="prediction-row">
            <dt className="prediction-label">Độ tin cậy</dt>
            <dd className="prediction-value">
              <div className="progress-bar-container">
                <div
                  className={isCancer ? 'progress-bar-fill-positive' : 'progress-bar-fill-negative'}
                  style={{ width: `${confidencePercent}%` }}
                ></div>
              </div>
              <span className="text-sm mt-1 inline-block">{confidencePercent}%</span>
            </dd>
          </div>

          <div className="prediction-row row-alt">
            <dt className="prediction-label">Khuyến nghị</dt>
            <dd className="prediction-value">
              {isCancer ? (
                <>
                  <p className="recommendation-positive">
                    Vui lòng tham khảo ý kiến bác sĩ càng sớm càng tốt.
                  </p>
                  <p className="mt-2">
                    Kết quả này chỉ mang tính tham khảo và không thay thế chẩn đoán y tế chuyên nghiệp.
                  </p>
                </>
              ) : (
                <>
                  <p className="recommendation-negative">
                    Không phát hiện dấu hiệu ung thư.
                  </p>
                  <p className="mt-2">
                    Tuy nhiên, bạn nên kiểm tra sức khỏe định kỳ và liên hệ bác sĩ nếu có triệu chứng bất thường.
                  </p>
                </>
              )}
            </dd>
          </div>
        </dl>
      </div>
      <div className="prediction-footer">
        <button onClick={onReset} className="reset-button">
          Phân tích ảnh khác
        </button>
      </div>
    </div>
  );
};

export default PredictionResult;
