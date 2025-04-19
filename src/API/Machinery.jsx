import axios from "axios";

const API_BASE_URL = "https://sara545.pythonanywhere.com";

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/equipment/categories/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export const getEquipmentsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/equipment/equipments`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching equipments for category ${categoryId}`,
      error
    );
    return [];
  }
};
