# oral-cancer-detection

## Yêu cầu hệ thống

- Hệ điều hành: Windows / Ubuntu / MacOS  
- Python: 3.8 trở lên  
- Node.js: 16 trở lên (nếu có frontend sử dụng Node.js)  
- Trình duyệt: Chrome hoặc Firefox  
- Thư viện cần cài đặt được liệt kê trong `requirements.txt` (backend) và `package.json` (frontend)  

---

## Cài đặt

### 1. Clone project từ GitHub
### 2. Cài đặt backend
```bash
cd cancer_detection_api
python -m venv venv
venv\Scripts\activate
```
sau đó cài các thư viện
```bash
pip install -r requirements.txt
```
Tạo tệp .env trong thư mục demofe với nội dung:
```bash
DB_URL=postgresql://postgres:phamkien12345@db:5432/cancer_detection
SECRET_KEY=skdjafuuify3iwh3fhueiwnjfb3yui2ey7yuik23iue7
```
### 3. Cài đặt frontend
```bash
cd ../demofe
npm install
```
Tạo tệp .env trong thư mục demofe với nội dung:
```bash
REACT_APP_API_URL=http://localhost:8000
```
### 4. Chạy hệ thống bằng Docker Compose
```bash
docker-compose up -d
```
Khi Docker Compose chạy xong, truy cập giao diện người dùng tại:
http://localhost:3000





