from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.db.database import get_db
from app.models.user import User
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionWithUser
from app.schemas.user import UserResponse
from app.services.auth import get_admin_user

router = APIRouter(tags=["Quản trị"])


@router.get("/users", response_model=list[UserResponse])
async def get_all_users(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_admin_user)
):
    """Lấy danh sách tất cả người dùng (chỉ admin)"""
    users = db.query(User).all()
    return users


@router.get("/predictions", response_model=list[PredictionWithUser])
async def get_all_predictions(
        db: Session = Depends(get_db),
        current_user: User = Depends(get_admin_user)
):
    predictions = (
        db.query(Prediction)
        .join(User, Prediction.user_id == User.id)
        .options(joinedload(Prediction.user))  # Load dữ liệu user
        .all()
    )

    # Chuẩn bị response
    result = []
    for pred in predictions:
        result.append({
            "id": pred.id,
            "user_id": pred.user_id,
            "username": pred.user.username,
            "full_name": pred.user.full_name,
            "image_path": pred.image_path,
            "prediction_result": pred.prediction_result,
            "confidence": pred.confidence,
            "created_at": pred.created_at
        })

    return result