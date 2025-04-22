from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PredictionCreate(BaseModel):
    pass

class PredictionResponse(BaseModel):
    id: int
    user_id: int
    full_name: Optional[str] = None
    image_path: str
    prediction_result: bool
    confidence: float
    created_at: datetime

    class Config:
        orm_mode = True

class PredictionWithUser(BaseModel):
    id: int
    full_name: Optional[str]
    username: str
    image_path: str
    prediction_result: bool
    confidence: float
    created_at: datetime

    class Config:
        orm_mode = True