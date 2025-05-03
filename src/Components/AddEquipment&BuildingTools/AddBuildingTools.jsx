import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreateConstructionMaterial,
  GetConstructionCategories,
} from "../../API/CreateConstructionMaterial";
import "./AddEquipment&AddBuildingTools.css";

const AddBuildingTools = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await GetConstructionCategories();
        setCategories(data);
      } catch (err) {
        console.error("فشل في جلب التصنيفات:", err);
      }
    };
    fetchCategories();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPhotoUploaded(true);
    } else {
      setImageFile(null);
      setPhotoUploaded(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", imageFile);
    formData.append("category", selectedCategory);

    try {
      const token = localStorage.getItem("token");
      await CreateConstructionMaterial(formData, token);
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
          <h1>إضافة مادة بناء</h1>

          <div className="input-group">
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="">اختر نوع المادة</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="label-line">نوع المادة</div>
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

export default AddBuildingTools;
