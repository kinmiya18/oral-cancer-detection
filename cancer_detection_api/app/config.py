import os
from pathlib import Path
from dotenv import load_dotenv

# Load các biến môi trường từ file .env
load_dotenv()

# Cấu hình cơ bản
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = os.path.join(BASE_DIR, "models", "cancer_model.h5")
UPLOAD_DIR = os.path.join(BASE_DIR, "static", "uploads")

# Cấu hình Database
DATABASE_URL = os.environ.get(
    "DATABASE_URL"
)

# Cấu hình JWT
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 365 * 10

# Đảm bảo thư mục uploads tồn tại
os.makedirs(UPLOAD_DIR, exist_ok=True)