import Lottie from "lottie-react";
import "./Loader.css";
import LoaderAnimation from "../../assets/Animation/Animation.json";

const Loader = () => {
  return (
    <div className="main-loader">
      <Lottie animationData={LoaderAnimation} />
    </div>
  );
};

export default Loader;
