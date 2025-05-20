import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import "./StatisticPage.css";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

function roundTo(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
const StatisticPage = () => {
  const { isAdmin } = useAuth();
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const token = localStorage.getItem("token"); // hoặc từ context
        const response = await fetch(
          "https://oral-cancer-detection-vjbd.onrender.com/admin/predictions",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("Dữ liệu từ API:", data); // Kiểm tra
        if (Array.isArray(data)) {
          setPredictions(data);
        } else {
          console.error("API không trả về mảng:", data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchPredictions();
  }, []);

  if (!isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  const total = predictions.length;
  const positive = predictions.filter(
    (p) => p.prediction_result === true
  ).length;
  const negative = total - positive;

  const pieData = {
    labels: ["Có dấu hiệu ung thư", "Không có dấu hiệu"],
    datasets: [
      {
        data: [positive, negative],
        backgroundColor: ["#f87171", "#34d399"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="statistic-container">
      <Header />
      <main className="statistic-main">
        <h1 className="statistic-title">Thống kê hệ thống</h1>

        <div className="statistic-overview">
          <div className="card">
            Tổng dự đoán: <strong>{total}</strong>
          </div>
          <div className="card text-red-500">
            Có dấu hiệu: <strong>{positive}</strong>
          </div>
          <div className="card text-green-500">
            Không có dấu hiệu: <strong>{negative}</strong>
          </div>
        </div>

        <div className="statistic-section">
          <div className="statistic-chart">
            <h2>Tỉ lệ dự đoán</h2>
            <Pie data={pieData} />
          </div>

          <div className="recent-predictions">
            <h2>Dự đoán gần nhất</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Họ tên</th>
                  <th>Tên người dùng</th>
                  <th>Kết quả</th>
                  <th>Độ tin cậy</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {[...predictions]
                  .sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 10)
                  .map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.full_name}</td>
                      <td>{p.username}</td>
                      <td>
                        {p.prediction_result
                          ? "Có dấu hiệu ung thư"
                          : "Không phát hiện dấu hiệu"}
                      </td>
                      <td>{roundTo(p.confidence * 100, 2)}%</td>
                      <td>{new Date(p.created_at).toLocaleString("vi-VN")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StatisticPage;
