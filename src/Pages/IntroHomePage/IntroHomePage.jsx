import { Outlet } from "react-router-dom";
import "./IntroHomePage.css";
import Bc_Ground from "../../assets/Images/bc-ground.jpeg";
import NavBarLogin from "../../Components/Util/NavBarLogin";

const IntroHomePage = () => {
  return (
    <div className="intro-home-page">
      <NavBarLogin />
      <Outlet />
      <div className="bc-ground">
        <img src={Bc_Ground} alt="خلفية بنمط هندسي" />
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default IntroHomePage;
