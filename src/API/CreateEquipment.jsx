import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const GetEquipmentCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/equipment/categories/`);
    return response.data;
  } catch (error) {
    console.error("فشل في جلب التصنيفات:", error);
    throw error;
  }
};

export const CreateEquipment = async (data, token) => {
  if (!token) {
    throw new Error("التوكين غير موجود! الرجاء تسجيل الدخول.");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/equipment/equipments/create/`,
      data,
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("فشل في إضافة المعدات:", error);
    throw error;
  }
};
