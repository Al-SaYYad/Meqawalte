import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../API/LoginUser";
import "./Login.css";
import { useAuth } from "../AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        login({ email, token: data.token });
        navigate("/home");
      }
    } catch (err) {
      setError(err.message || "فشل في تسجيل الدخول");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main-login">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>تسجيل الدخول</h1>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="label-line">الايميل</div>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="label-line">كلمة السر</div>
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل"}
          </button>
          <Link to={"/register"} className="reg-link">
            انشاء حساب
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
