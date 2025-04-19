import { useNavigate, Link } from "react-router-dom";
import "./Home.css";
import hero_background from "../../assets/Images/home-hero-section.jpg";
import Item_Image from "../../assets/Images/Item-Image.png";
import Item_Image_2 from "../../assets/Images/Item-Image-2.jpg";
import Item_Image_3 from "../../assets/Images/Item-Image-3.jpg";

const routeMap = {
  عامل: "/home/worker",
  "معدات ثقيله": "/home/heavy-machinery",
  "ادوات بناء": "/home/building-tools",
  "عامل سباكه":
    "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D8%B3%D8%A8%D8%A7%D9%83%D9%87",
  "عامل نجارة":
    "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D9%86%D8%AC%D8%A7%D8%B1%D8%A9",
  "عامل حداده":
    "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D8%AD%D8%AF%D8%A7%D8%AF%D9%87",
  "عامل كهرباء":
    "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D9%83%D9%87%D8%B1%D8%A8%D8%A7%D8%A1",
  "عامل محارة":
    "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D9%85%D8%AD%D8%A7%D8%B1%D8%A9",
  "عامل نقاشه":
    "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D9%86%D9%82%D8%A7%D8%B4%D9%87",
  "عامل عام": "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D8%B9%D8%A7%D9%85",
  "عامل ونش": "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D9%88%D9%86%D8%B4",
  "عامل سرميك":
    "/home/%D8%B9%D8%A7%D9%85%D9%84%20%D8%B3%D8%B1%D9%85%D9%8A%D9%83",
};

const Home = () => {
  const navigate = useNavigate();
  const options = Object.entries(routeMap);

  const handleSelect = (e) => {
    const path = e.target.value;
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="main-home">
      <div className="hero-section">
        <div className="bg">
          <img src={hero_background} alt="Background Image" />
          <div className="overlay"></div>
        </div>
        <h1>هل تحتاج مساعدة في تنفيذ أعمالك؟</h1>

        <div className="search">
          <select onChange={handleSelect} defaultValue="">
            <option value="" disabled>
              اختر خدمة...
            </option>
            {options.map(([label, path]) => (
              <option key={label} value={path}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="categories">
          {options.slice(0, 5).map(([label, path]) => (
            <div key={label} className="cate" onClick={() => navigate(path)}>
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="services">
        <div className="container">
          <h2>كافة الخدمات الاحترافية لتطوير أعمالك</h2>
          <div className="items">
            <Link to="/home/building-tools">
              <div className="item">
                <img src={Item_Image_2} alt="Item Image" />
                <h3>ادوات البناء</h3>
              </div>
            </Link>
            <Link to="/home/heavy-machinery">
              <div className="item">
                <img src={Item_Image_3} alt="Item Image" />
                <h3>معدات ثقيله</h3>
              </div>
            </Link>
            <Link to="/home/worker">
              <div className="item">
                <img src={Item_Image} alt="Item Image" />
                <h3>عامل</h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
