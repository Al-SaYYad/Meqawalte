import Footer from "../../Components/Util/Footer";
import NavBar from "../../Components/Util/NavBar";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default HomePage;
