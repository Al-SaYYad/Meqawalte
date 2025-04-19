import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { RegisterUser } from "../../../API/RegisterUser";
import { useAuth } from "../AuthProvider";

const governoratesData = {
  قنا: [
    "أبو تشت",
    "فرشوط",
    "نجع حمادي",
    "الوقف",
    "دشنا",
    "قنا عاصمة المحافظة",
    "قفط",
    "قوص",
    "نقادة",
  ],
  الأقصر: ["البياضية", "الطود", "القرنة", "أرمنت", "اسنا", "الزينية"],
  سوهاج: [
    "سوهاج",
    "أخميم",
    "دار السلام",
    "ساقلتة",
    "المراغة",
    "طهطا",
    "طما",
    "جهينة",
    "المنشاة",
    "جرجا",
    "البلينا",
  ],
  أسيوط: [
    "ديروط",
    "القوصية",
    "أبنوب",
    "منفلوط",
    "أسيوط",
    "الفتح",
    "أبو تيج",
    "الغنايم",
    "ساحل سليم",
    "البداري",
    "صدفا",
  ],
};

const Register = () => {
  const [role, setRole] = useState("worker");
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [availableCenters, setAvailableCenters] = useState([]);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleChange = (event) => {
    setRole(event.target.id);
    if (event.target.id !== "worker") {
      setErrors((prev) => ({ ...prev, workerSpecialization: "", price: "" }));
    }
  };

  const handleGovernorateChange = (e) => {
    const gov = e.target.value;
    setSelectedGovernorate(gov);
    setAvailableCenters(governoratesData[gov] || []);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhotoUploaded(true);
      setErrors((prev) => ({ ...prev, profileImage: "" }));
    } else {
      setPhotoUploaded(false);
    }
  };

  const validateFields = ({
    firstName,
    lastName,
    email,
    phone,
    governorate,
    city,
    password,
    passwordConfirmation,
    workerSpecialization,
    profileImage,
    price,
  }) => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "هذا الحقل مطلوب";
    if (!lastName.trim()) newErrors.lastName = "هذا الحقل مطلوب";
    if (!email.trim()) newErrors.email = "هذا الحقل مطلوب";
    if (!phone.trim()) newErrors.phone = "هذا الحقل مطلوب";
    if (!governorate.trim()) newErrors.governorate = "هذا الحقل مطلوب";
    if (!city.trim()) newErrors.city = "هذا الحقل مطلوب";
    if (!password) newErrors.password = "هذا الحقل مطلوب";
    if (!passwordConfirmation)
      newErrors.passwordConfirmation = "هذا الحقل مطلوب";
    if (password && passwordConfirmation && password !== passwordConfirmation)
      newErrors.passwordConfirmation = "كلمتا السر غير متطابقتين";
    if (!profileImage) newErrors.profileImage = "يجب تحميل صورة";
    if (role === "worker") {
      if (!workerSpecialization || workerSpecialization === "")
        newErrors.workerSpecialization = "اختر التخصص";
      if (!price.trim()) newErrors.price = "هذا الحقل مطلوب";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("tel").value;
    const governorate = document.getElementById("city").value;
    const city = document.getElementById("center").value;
    const password = document.getElementById("password-one").value;
    const passwordConfirmation = document.getElementById("password-two").value;
    const profileImage = document.getElementById("photo").files[0];

    let workerSpecialization = "";
    if (role === "worker") {
      workerSpecialization =
        document.getElementById("worker-skill").value || "";
    }

    let price = "";
    if (role === "worker") {
      price = document.getElementById("price").value;
    }

    const fieldErrors = validateFields({
      firstName,
      lastName,
      email,
      phone,
      governorate,
      city,
      password,
      passwordConfirmation,
      workerSpecialization,
      profileImage,
      price,
    });
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("governorate", governorate);
    formData.append("city", city);

    const userType = role === "machine" ? "equipment_owner" : role;
    formData.append("user_type", userType);

    if (role === "worker") {
      formData.append("worker_specialization", workerSpecialization);
      formData.append("price", price);
    }
    formData.append("password", password);
    formData.append("password_confirmation", passwordConfirmation);
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }

    setIsSubmitting(true);
    try {
      const data = await RegisterUser(formData);
      if (data.token) {
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("role", role);
        login({ email, token: data.token });
      }

      if (userType === "equipment_owner") {
        navigate("/add-equipment");
      } else if (userType === "construction_owner") {
        navigate("/construction-materials");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("❌ Registration error:", error);
      setErrors(error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="main-register">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>إنشاء حساب ...</h1>
          <div className="check-form">
            <div className="check">
              <input
                type="radio"
                id="worker"
                name="role"
                onChange={handleRoleChange}
                checked={role === "worker"}
              />
              <label htmlFor="worker">عامل</label>
            </div>
            <div className="check">
              <input
                type="radio"
                id="contractor"
                name="role"
                onChange={handleRoleChange}
                checked={role === "contractor"}
              />
              <label htmlFor="contractor">مقاول</label>
            </div>
            <div className="check">
              <input
                type="radio"
                name="role"
                id="construction_owner"
                onChange={handleRoleChange}
              />
              <label htmlFor="construction_owner">مواد بناء</label>
            </div>
            <div className="check">
              <input
                type="radio"
                id="machine"
                name="role"
                onChange={handleRoleChange}
                checked={role === "machine"}
              />
              <label htmlFor="machine">صاحب مُعَدّة</label>
            </div>
          </div>
          <div className="names">
            <div className="input-group">
              <input type="text" id="first-name" required />
              <div className="label-line">الاسم الأول</div>
              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>
            <div className="input-group">
              <input type="text" id="last-name" required />
              <div className="label-line">الاسم الثاني</div>
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="input-group">
            <input type="email" id="email" required />
            <div className="label-line">الإيميل</div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="input-group">
            <input
              type="tel"
              id="tel"
              required
              inputMode="numeric"
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
              }}
              onPaste={(e) => {
                const pasted = e.clipboardData.getData("Text");
                if (!/^\d+$/.test(pasted)) {
                  e.preventDefault();
                }
              }}
            />
            <div className="label-line">رقم الهاتف</div>
            {errors.phone && <p className="error-message">{errors.phone}</p>}
          </div>
          <div className="city">
            <div className="input-group">
              <select
                name="city"
                id="city"
                value={selectedGovernorate}
                onChange={handleGovernorateChange}
              >
                <option value="">اختر المحافظة</option>
                {Object.keys(governoratesData).map((gov) => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
              <div className="label-line">المحافظة</div>
              {errors.governorate && (
                <p className="error-message">{errors.governorate}</p>
              )}
            </div>
            <div className="input-group">
              <select name="center" id="center">
                <option value="">اختر المركز</option>
                {availableCenters.map((center) => (
                  <option key={center} value={center}>
                    {center}
                  </option>
                ))}
              </select>
              <div className="label-line">المركز</div>
              {errors.city && <p className="error-message">{errors.city}</p>}
            </div>
          </div>
          {role === "worker" && (
            <>
              <div className="input-group">
                <select name="worker-skill" id="worker-skill" required>
                  <option value="">اختر التخصص</option>
                  <option value="plumbing">عامل سباكة</option>
                  <option value="carpentry">عامل نجارة</option>
                  <option value="blacksmith">عامل حدادة</option>
                  <option value="electrician">عامل كهرباء</option>
                  <option value="plaster">عامل محارة</option>
                  <option value="painter">عامل نقاشة</option>
                </select>
                <div className="label-line">العمل</div>
                {errors.workerSpecialization && (
                  <p className="error-message">{errors.workerSpecialization}</p>
                )}
              </div>
              <div className="input-group">
                <input type="text" id="price" required />
                <div className="label-line">اضف سعر</div>
                {errors.price && (
                  <p className="error-message">{errors.price}</p>
                )}
              </div>
            </>
          )}
          <div className="input-group">
            <input type="password" id="password-one" required />
            <div className="label-line">كلمة السر</div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="input-group">
            <input type="password" id="password-two" required />
            <div className="label-line">تأكيد كلمة السر</div>
            {errors.passwordConfirmation && (
              <p className="error-message">{errors.passwordConfirmation}</p>
            )}
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
                ? "تم إضافة الصوره بنجاح"
                : "📷 اختر صورة أو التقط واحدة"}
            </label>
            {errors.profileImage && (
              <p className="error-message">{errors.profileImage}</p>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "جاري التسجيل..." : "إنشاء حساب"}
          </button>
          <Link to={"/login"} className="reg-link">
            لدي حساب
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
