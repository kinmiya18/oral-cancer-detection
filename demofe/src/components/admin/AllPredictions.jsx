import React, { useState, useEffect } from "react";
import { getAllPredictions } from "../../api/predictionService";
import "./AllPredictions.css";

const ITEMS_PER_PAGE = 5;

const AllPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getAllPredictions();
        setPredictions(data);
      } catch (err) {
        setError(err.detail || "Không thể tải danh sách dự đoán");
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
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
      <div className="loader">
        <div></div>
      </div>
    );
  }

  if (error) {
    return <div className="alert">{error}</div>;
  }

  return (
    <div className="predictions-container">
      <div className="predictions-header">
        <h3 className="predictions-title">Tất cả dự đoán</h3>
        <p className="predictions-subtitle">
          Danh sách tất cả dự đoán trong hệ thống
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="predictions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Người dùng</th>
              <th>Ảnh</th>
              <th>Kết quả</th>
              <th>Độ tin cậy</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {currentPredictions.map((prediction) => (
              <tr key={prediction.id}>
                <td>{prediction.id}</td>
                <td>
                  <div>{prediction.username}</div>
                  <div>{prediction.full_name || "-"}</div>
                </td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/static/${prediction.image_path}`}
                    alt="Prediction"
                    className="prediction-image"
                  />
                </td>
                <td>
                  <span
                    className={`badge ${
                      prediction.prediction_result
                        ? "badge-danger"
                        : "badge-success"
                    }`}
                  >
                    {prediction.prediction_result
                      ? "Có dấu hiệu ung thư"
                      : "Không phát hiện dấu hiệu ung thư"}
                  </span>
                </td>
                <td>{(prediction.confidence * 100).toFixed(2)}%</td>
                <td>
                  {new Date(prediction.created_at).toLocaleString("vi-VN")}
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

export default AllPredictions;
