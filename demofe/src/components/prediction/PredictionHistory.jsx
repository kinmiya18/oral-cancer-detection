import React, { useState, useEffect } from "react";
import { getPredictionHistory } from "../../api/predictionService";
import "./PredictionHistory.css";

const ITEMS_PER_PAGE = 5;

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getPredictionHistory();
        setPredictions(data);
      } catch (err) {
        setError(err.detail || "Không thể tải lịch sử dự đoán");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const totalPages = Math.ceil(predictions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentPredictions = predictions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="loading-circle"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-alert">{error}</div>;
  }

  if (predictions.length === 0) {
    return (
      <div className="empty-state">
        Bạn chưa có dự đoán nào. Hãy tạo dự đoán mới!
      </div>
    );
  }

  return (
    <div className="prediction-container">
      <div className="prediction-header">
        <h3 className="prediction-title">Lịch sử dự đoán</h3>
        <p className="prediction-subtitle">
          Danh sách các dự đoán trước đây của bạn
        </p>
      </div>
      <div className="prediction-table-container">
        <table className="prediction-table">
          <thead className="prediction-thead">
            <tr>
              <th className="prediction-th">Thời gian</th>
              <th className="prediction-th">Ảnh</th>
              <th className="prediction-th">Kết quả</th>
              <th className="prediction-th">Độ tin cậy</th>
            </tr>
          </thead>
          <tbody>
            {currentPredictions.map((prediction) => (
              <tr key={prediction.id}>
                <td className="prediction-td">
                  {new Date(prediction.created_at).toLocaleString("vi-VN")}
                </td>
                <td className="prediction-td">
                  <div className="prediction-img-container">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/static/${prediction.image_path}`}
                      alt="Prediction"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </td>
                <td className="prediction-td">
                  <span
                    className={`prediction-badge ${
                      prediction.prediction_result
                        ? "badge-cancer"
                        : "badge-no-cancer"
                    }`}
                  >
                    {prediction.prediction_result
                      ? "Có dấu hiệu ung thư"
                      : "Không phát hiện dấu hiệu ung thư"}
                  </span>
                </td>
                <td className="prediction-td">
                  {(prediction.confidence * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#8592;
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              className={currentPage === idx + 1 ? "active" : ""}
              onClick={() => goToPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;
