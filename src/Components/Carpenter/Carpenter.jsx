import hero_background from "../../assets/Images/carpenter-hero-section.jpg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Carpenter.css";
import { getWorkersBySpecialization } from "../../API/ApiWorker";
import { CreateOrder } from "../../API/CreateOrder";
import { useOrder } from "../../Context/OrderContext";
const BASE_URL = "https://sara545.pythonanywhere.com";

const Carpenter = () => {
  const { name } = useParams();
  const [workers, setWorkers] = useState([]);
  const { fetchMyPurchases } = useOrder();

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const data = await getWorkersBySpecialization(name);
        setWorkers(data);
      } catch (error) {
        console.error("فشل في جلب العمال:", error);
      }
    };
    fetchWorkers();
  }, [name]);

  const handleOrder = async (item_id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }
    try {
      if (!token) {
        alert("الرجاء تسجيل الدخول");
        return;
      }
      const response = await CreateOrder("worker", Number(item_id), token);
      alert("تم الطلب بنجاح ✔");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "حدث خطأ ما";
      alert(errorMessage);
    }
  };

  return (
    <div className="main-carpenter">
      <div className="hero-section">
        <div className="bg">
          <img src={hero_background} alt="Background Image" />
          <div className="overlay"></div>
        </div>
        <h1>{name}</h1>
      </div>
      <div className="container">
        {workers.map((worker) => (
          <div className="card" key={worker.id}>
            <img src={`${BASE_URL}${worker.profile_image}`} alt="Card Image" />
            <div className="card-body">
              <h3>{`${worker.first_name} ${worker.last_name}`}</h3>
              <p>{`عمال / ${worker.worker_specialization}`}</p>
              <div className="rate">
                <div className="stars">
                  {[...Array(4)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                  ))}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-star-half"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.354 5.119 7.538.792A.52.52 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.54.54 0 0 1 16 6.32a.55.55 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.5.5 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.6.6 0 0 1 .085-.302.51.51 0 0 1 .37-.245zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.56.56 0 0 1 .162-.505l2.907-2.77-4.052-.576a.53.53 0 0 1-.393-.288L8.001 2.223 8 2.226z" />
                  </svg>
                </div>
                <h4>تبدأ من {worker.price} ج</h4>
              </div>
              <div className="card-foot">
                <div className="location">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-geo-alt-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  {worker.governorate} - {worker.city}
                </div>
                <button onClick={() => handleOrder(worker.id)}>
                  اطلب الان
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carpenter;
