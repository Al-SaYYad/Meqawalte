import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const GetConstructionMaterialCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/construction/categories_construction/`);
    return response.data;
  } catch (error) {
    console.error("فشل في جلب تصنيفات مواد البناء:", error);
    throw error;
  }
};
