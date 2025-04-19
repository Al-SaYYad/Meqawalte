import "./IntroHome.css";
import Main_Logo from "../../assets/Icon/Main-Logo.svg";
import { Link } from "react-router-dom";

const IntroHome = () => {
  return (
    <div className="main-intro-home">
      <div className="container">
        <div className="head-intro-home">
          <h1>مقـولاتـي </h1>
          <div className="logo">
            <img src={Main_Logo} alt="Main Logo" />
          </div>
        </div>
        <div className="center-sec">
          <h2>
            مشروع "Meqawalate" هو منصة ويب تستهدف كلا من المقاولين والعمال،وتهدف
            ...
          </h2>
        </div>
        <div className="start">
          <Link to="/login">ابداء...</Link>
        </div>
      </div>
    </div>
  );
};

export default IntroHome;
