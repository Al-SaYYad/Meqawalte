import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const CreateConstructionMaterial = async (formData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/construction/create/`,
      formData,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "❌ خطأ في إضافة مادة البناء:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const GetConstructionCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/construction/categories_construction/`
    );
    return response.data;
  } catch (error) {
    console.error("❌ فشل في جلب تصنيفات مواد البناء:", error);
    throw error;
  }
};
