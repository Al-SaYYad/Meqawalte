import axios from "axios";

const API_BASE_URL = "https://sara545.pythonanywhere.com";

export const getConstructionCategories = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/construction/categories_construction/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching construction categories", error);
    return [];
  }
};

export const getConstructionProjects = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/construction/construction_list/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching construction projects", error);
    return [];
  }
};
