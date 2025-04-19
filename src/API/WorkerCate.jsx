import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const getSpecializations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/specializations`);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch specializations:", error);
    throw error.response?.data || { message: "Something went wrong" };
  }
};
