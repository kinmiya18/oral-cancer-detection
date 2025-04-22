from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from app.db.database import get_db
from app.models.prediction import Prediction
from app.models.user import User
from app.schemas.prediction import PredictionResponse
from app.services.auth import get_current_active_user
from app.services.prediction import save_image, predict_cancer, create_prediction_record

router = APIRouter(prefix="/predictions", tags=["Dự đoán ung thư"])


@router.post("/", response_model=PredictionResponse)
async def create_prediction(
        file: UploadFile = File(...),
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_active_user)
):

    image_path = await save_image(file)

    try:
        is_cancer, confidence = await predict_cancer(image_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi dự đoán: {str(e)}")

    # Lưu vào database
    prediction = await create_prediction_record(
        db, current_user, image_path, is_cancer, confidence
    )

    return prediction


@router.get("/history", response_model=list[PredictionResponse])
async def get_all_predictions(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_active_user)
):
    # Truy vấn danh sách dự đoán của người dùng hiện tại
    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == current_user.id)  # Chỉ lấy dữ liệu của user hiện tại
        .order_by(Prediction.created_at.desc())
        .all()
    )

    # Chuyển dữ liệu về response model
    return [
        PredictionResponse(
            id=p.id,
            user_id=p.user_id,
            full_name=current_user.full_name,  # Lấy từ current_user vì đã lọc theo user_id
            image_path=p.image_path,
            prediction_result=p.prediction_result,
            confidence=p.confidence,
            created_at=p.created_at
        )
        for p in predictions
    ]
