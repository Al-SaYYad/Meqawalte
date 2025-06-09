import { useState, useEffect } from "react";
import { getCategories, getEquipmentsByCategory } from "../../API/Machinery";
import "./HeavyMachinery.css";
import hero_background from "../../assets/Images/heavy-machinery.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { CreateOrder } from "../../API/CreateOrder";
import DataNotFound from "../DataNotFound/DataNotFound";

const BASE_URL = "https://sara545.pythonanywhere.com";

const HeavyMachinery = () => {
  const [categories, setCategories] = useState([]);
  const [allEquipments, setAllEquipments] = useState([]);
  const [equipments, setEquipments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    const fetchAllEquipments = async () => {
      const data = await getEquipmentsByCategory();
      setAllEquipments(data);
      setEquipments(data);
    };

    fetchCategories();
    fetchAllEquipments();
  }, []);

  const filterEquipments = (categoryId) => {
    if (categoryId !== null) {
      const filteredEquipments = allEquipments.filter(
        (equipment) => equipment.category === categoryId
      );
      setEquipments(filteredEquipments);
    } else {
      setEquipments(allEquipments);
    }
  };

  useEffect(() => {
    filterEquipments(selectedCategory);
  }, [selectedCategory, allEquipments]);

  const handleOrderNow = async (equipment) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("يرجى تسجيل الدخول أولاً");
      return;
    }

    try {
      const response = await CreateOrder("equipment", equipment.id, token);
      alert("تم الطلب بنجاح ✔");
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "حدث مشكله اثناء الطلب";
      alert(errorMessage);
    }
  };

  return (
    <div className="main-machinery">
      <div className="hero-section">
        <div className="bg">
          <img src={hero_background} alt="Background Image" />
          <div className="overlay"></div>
        </div>
        <h1>معدات ثقيله</h1>
        <h2>ابحث عن المعدات الثقيلة لمشاريعك !</h2>
      </div>

      <div className="categories">
        <Swiper
          slidesPerView="auto"
          spaceBetween={30}
          modules={[Navigation]}
          navigation
          className="mySwiper"
        >
          {categories.map((category) => (
            <SwiperSlide
              key={category.id}
              className={`swip-card ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <img src={`${BASE_URL}${category.image}`} alt={category.name} />
              <h2>{category.name}</h2>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="container">
        {equipments.length === 0 ? (
          <DataNotFound />
        ) : (
          equipments.map((equipment) => (
            <div className="card" key={equipment.id}>
              <img src={equipment.image} alt="Card Image" />
              <div className="card-body">
                <h3>{equipment.description}</h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "6px",
                  }}
                >
                  <div className="rate">
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
                    <span className="rating-value">
                      {equipment.rating ?? "لا يوجد تقييم"}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 500,
                      color: "#cfc7bf",
                    }}
                  >
                    رقم الهاتف: {equipment.phone}
                  </span>
                </div>
                <div className="card-foot">
                  <h4>تبداء من {equipment.price} ج</h4>
                  <button onClick={() => handleOrderNow(equipment)}>
                    اطلب الان
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HeavyMachinery;
