import { useEffect, useState } from "react";
import { getSpecializations } from "../../API/WorkerCate";
import { useNavigate } from "react-router-dom";
import "./Worker.css";
import hero_background from "../../assets/Images/worker-hero-section.jpg";
const BASE_URL = "https://sara545.pythonanywhere.com";

const Worker = () => {
  const [specializations, setSpecializations] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        const data = await getSpecializations();
        setSpecializations(data);
      } catch (err) {
        setError("فشل تحميل التصنيفات");
      }
    };

    fetchSpecializations();
  }, []);

  const handleClick = (name) => {
    navigate(`/home/${name}`);
  };

  return (
    <div className="main-worker">
      <div className="hero-section">
        <div className="bg">
          <img src={hero_background} alt="Background" />
          <div className="overlay"></div>
        </div>
        <h1>عامل</h1>
        <p>اختار عامل بعناية ..</p>
      </div>

      <div className="categories">
        <h2>تصنيفات العمال </h2>
        <div className="container">
          {error && <p className="error-message">{error}</p>}
          {specializations.length === 0 && !error ? (
            <p>جاري تحميل التصنيفات...</p>
          ) : (
            specializations.map((specialization, index) => (
              <div
                className="cate-worker"
                key={index}
                onClick={() => handleClick(specialization.name)}
              >
                <img
                  src={`${BASE_URL}${specialization.icon}`}
                  alt="Specialization Icon"
                  onError={(e) =>
                    (e.target.src = "")
                  }
                />
                <h3>{specialization.name}</h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Worker;
