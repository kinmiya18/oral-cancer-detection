import React, { useState } from 'react';
import { createPrediction } from '../../api/predictionService';
import './PredictionForm.css';

const PredictionForm = ({ onPredictionComplete }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Vui lòng chọn một ảnh để tải lên');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await createPrediction(file);
      onPredictionComplete(result);
    } catch (err) {
      setError(err.detail || 'Có lỗi xảy ra khi dự đoán. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <div className="prediction-header">
        <h3 className="prediction-title">Tải lên ảnh để dự đoán</h3>
        <div className="prediction-description">
          <p>Tải lên ảnh miệng của bạn để phân tích và dự đoán khả năng ung thư.</p>
        </div>

        {error && <div className="prediction-error">{error}</div>}

        <form onSubmit={handleSubmit} className="prediction-form">
          <div>
            <label className="prediction-file-label">Chọn ảnh</label>
            <div className="prediction-dropzone">
              <label className="prediction-dropzone-label">
                <div className="prediction-dropzone-content">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p>{file ? file.name : 'Chọn một ảnh'}</p>
                </div>
                <input
                  type="file"
                  className="opacity-0"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {preview && (
            <div className="prediction-preview-container">
              <p className="prediction-preview-label">Ảnh đã chọn:</p>
              <img src={preview} alt="Preview" className="prediction-preview-img" />
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !file}
              className="prediction-button"
            >
              {loading ? (
                <div className="prediction-spinner">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  Đang xử lý...
                </div>
              ) : 'Phân tích ảnh'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PredictionForm;
