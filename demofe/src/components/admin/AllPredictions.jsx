import React, { useState, useEffect } from 'react';
import { getAllPredictions } from '../../api/predictionService';
import './AllPredictions.css'; 

const AllPredictions = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getAllPredictions();
        setPredictions(data);
      } catch (err) {
        setError(err.detail || 'Không thể tải danh sách dự đoán');
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

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
        <p className="predictions-subtitle">Danh sách tất cả dự đoán trong hệ thống</p>
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
            {predictions.map((prediction) => (
              <tr key={prediction.id}>
                <td>{prediction.id}</td>
                <td>
                  <div>{prediction.username}</div>
                  <div>{prediction.full_name || '-'}</div>
                </td>
                {/* <td>
                  <img 
                    src={`${import.meta.env.VITE_API_URL}/${prediction.image_path}`} 
                    alt="Prediction" 
                    className="prediction-image"
                  />
                </td> */}
                <td>
                  <span className={`badge ${prediction.prediction_result ? 'badge-danger' : 'badge-success'}`}>
                    {prediction.prediction_result ? 'Có dấu hiệu ung thư' : 'Không phát hiện dấu hiệu ung thư'}
                  </span>
                </td>
                <td>{(prediction.confidence * 100).toFixed(2)}%</td>
                <td>{new Date(prediction.created_at).toLocaleString('vi-VN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPredictions;
