import axiosInstance from "./axios";

// Tải ảnh lên và lấy kết quả dự đoán
export const createPrediction = async (imageFile) => {
  try {
    // Sử dụng FormData để gửi file
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axiosInstance.post("/predictions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Có lỗi xảy ra khi dự đoán" };
  }
};

// Lấy lịch sử dự đoán của người dùng
export const getPredictionHistory = async () => {
  try {
    const response = await axiosInstance.get("/predictions/history");
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Không thể lấy lịch sử dự đoán" };
  }
};

// Lấy tất cả dự đoán (chỉ dành cho admin)
export const getAllPredictions = async () => {
  try {
    const response = await axiosInstance.get("/admin/predictions");
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: "Không thể lấy danh sách dự đoán" };
  }
};

// Lấy danh sách tất cả người dùng (chỉ dành cho admin)
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get("/admin/users");
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { detail: "Không thể lấy danh sách người dùng" }
    );
  }
};
