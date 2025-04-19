import "./NavBarLogin.css";
import { NavLink } from "react-router-dom";

const NavBarLogin = () => {
  return (
    <div className="main-nav-bar-login">
      <nav>
        <div>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            الرئيسيه
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/about-us"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            حول الموقع
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/contact-us"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            تواصل معنا
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/login"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            تسجيل الدخول
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default NavBarLogin;
