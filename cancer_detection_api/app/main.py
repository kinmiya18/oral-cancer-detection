from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import auth, prediction, admin
from app.db.database import Base, engine

# Khởi tạo bảng trong database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Ứng dụng phát hiện ung thư",
    description="API dự đoán ung thư từ ảnh sử dụng mô hình máy học",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Đăng ký các API routers
app.include_router(auth.router, tags=["Xác thực"])
app.include_router(prediction.router, tags=["Dự đoán ung thư"])
app.include_router(admin.router, prefix="/admin", tags=["Quản trị"])

# Mount thư mục static cho uploads
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return {"message": "Chào mừng đến với API dự đoán ung thư từ ảnh"}