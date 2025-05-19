import { useState, useEffect } from "react"
import {Link, useNavigate} from "react-router-dom"
import { register } from "../../api/authService"
import "./Register.css"

const Register = () => {
  useEffect(() => {
    const appHeader = document.querySelector('header');
    const appFooter = document.querySelector('footer');

    if (appHeader) appHeader.style.display = 'none';
    if (appFooter) appFooter.style.display = 'none';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      if (appHeader) appHeader.style.display = '';
      if (appFooter) appFooter.style.display = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [])

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Kiểm tra xác nhận mật khẩu
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.")
      return
    }

    setLoading(true)
    try {
      const { confirmPassword, ...dataToSubmit } = formData
      await register(dataToSubmit)

      alert("Đăng ký thành công! Vui lòng đăng nhập.")
      navigate("/login")
    } catch (err) {
      setError(err.detail || "Đăng ký thất bại. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  return (
      <div className="register-container">
        <div className="register-image-container">
          <div className="register-image"></div>
        </div>

        <div className="register-form-container">
          <div className="register-form-wrapper">
            <h1 className="register-title">Đăng ký tài khoản</h1>

            {error && <div className="register-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="input-group">
                <label htmlFor="username">Tên đăng nhập</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="input-field"
                    value={formData.username}
                    onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="full_name">Họ và tên</label>
                <input
                    id="full_name"
                    name="full_name"
                    type="text"
                    className="input-field"
                    value={formData.full_name}
                    onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="password">Mật khẩu</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="input-field"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="input-field"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />
              </div>

              <button type="submit" disabled={loading} className="register-button-primary">
                {loading ? "Đang xử lý..." : "Đăng ký"}
              </button>

              <p className="already-have-account">
                Bạn đã có tài khoản?{" "}
                <Link to="/login" className="login-link">
                  Đăng nhập
                </Link>
              </p>

            </form>
          </div>
        </div>
      </div>
  )
}

export default Register
