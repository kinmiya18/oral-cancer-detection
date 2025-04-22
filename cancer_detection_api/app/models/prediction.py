from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    image_path = Column(String)
    prediction_result = Column(Boolean)  # True nếu dự đoán là ung thư, False nếu không
    confidence = Column(Float)  # Tỉ lệ dự đoán
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationship với User
    user = relationship("User", backref="predictions")