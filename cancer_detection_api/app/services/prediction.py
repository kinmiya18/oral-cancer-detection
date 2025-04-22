import os
import uuid
from typing import Tuple
import numpy as np
import tensorflow as tf
from PIL import Image
from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from app.config import MODEL_PATH, UPLOAD_DIR
from app.models.prediction import Prediction
from app.models.user import User

# Tải mô hình
model = None
try:
    model = tf.keras.models.load_model(MODEL_PATH)
except Exception as e:
    print(f"Không thể tải mô hình: {e}")


async def save_image(file: UploadFile) -> str:
    """Lưu ảnh tải lên và trả về đường dẫn"""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File không phải là ảnh")

    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    # Đọc và lưu file
    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    # Trả về đường dẫn tương đối
    return os.path.join("uploads", unique_filename)


async def preprocess_image(image_path: str) -> np.ndarray:
    """Tiền xử lý ảnh cho mô hình"""
    full_path = os.path.join("static", image_path)

    try:
        img = Image.open(full_path)
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0  # Chuẩn hóa
        img_array = np.expand_dims(img_array, axis=0)  # Thêm batch dimension
        return img_array
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi xử lý ảnh: {str(e)}")


async def predict_cancer(image_path: str) -> Tuple[bool, float]:
    """Dự đoán ung thư từ ảnh"""
    if model is None:
        raise HTTPException(status_code=500, detail="Mô hình chưa được tải")

    # Tiền xử lý ảnh
    img_array = await preprocess_image(image_path)

    # Dự đoán
    try:
        prediction = model.predict(img_array)
        score = float(prediction[0][0])

        is_cancer = score < 0.5
        confidence = 1 - score if is_cancer else score

        return is_cancer, confidence
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi dự đoán: {str(e)}")


async def create_prediction_record(
        db: Session, user: User, image_path: str, is_cancer: bool, confidence: float
) -> Prediction:
    """Tạo bản ghi dự đoán trong database"""
    prediction = Prediction(
        user_id=user.id,
        image_path=image_path,
        prediction_result=is_cancer,
        confidence=confidence
    )

    db.add(prediction)
    db.commit()
    db.refresh(prediction)

    return prediction