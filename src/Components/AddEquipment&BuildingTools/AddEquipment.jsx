import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CreateConstructionMaterial } from "../../API/CreateConstructionMaterial";
import {
  GetEquipmentCategories,
  CreateEquipment,
} from "../../API/CreateEquipment";
import "./AddEquipment&AddBuildingTools.css";

const AddEquipment = () => {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await GetEquipmentCategories();
        setCategories(data);
      } catch (err) {
        console.error("فشل في جلب التصنيفات:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    setRole(userRole);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPhotoUploaded(true);
    } else {
      setPhotoUploaded(false);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("price", price);
    formData.append("description", description);
    formData.append("rating", rating);
    formData.append("image", imageFile);
    formData.append("category", selectedCategory);

    try {
      const token = localStorage.getItem("token");
      if (role === "construction_owner") {
        await CreateConstructionMaterial(formData, token);
      } else {
        await CreateEquipment(formData, token);
      }
      navigate("/home");
    } catch (err) {
      console.error("فشل في إرسال البيانات:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-equipment">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>
            {role === "construction_owner" ? "إضافة مادة بناء" : "إضافة معدة"}
          </h1>

          <div className="input-group">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">اختر نوع المعدة/المادة</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="label-line">نوع المعدة/المادة</div>
          </div>

          <div className="input-group">
            <input
              type="text"
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div className="label-line">وصف</div>
          </div>

          <div className="input-group">
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => {
                const val = e.target.value;
                if (
                  val === "" ||
                  (/^\d+$/.test(val) && +val >= 1 && +val <= 5)
                ) {
                  setRating(val);
                }
              }}
              min={1}
              max={5}
              required
            />
            <div className="label-line">تقييم المعدة (1-5)</div>
          </div>

          <div className="input-group">
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <div className="label-line">أضف سعر</div>
          </div>

          <div className="input-group">
            <input
              type="file"
              id="photo"
              accept="image/*"
              capture="user"
              required
              style={{ display: "none" }}
              onChange={handlePhotoChange}
            />
            <label htmlFor="photo" className="custom-upload-button">
              {photoUploaded
                ? "تم إضافة الصورة بنجاح"
                : "📷 اختر صورة أو التقط واحدة"}
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "جاري تحميل البيانات..." : "التالي"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEquipment;
