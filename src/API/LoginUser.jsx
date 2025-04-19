import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login/`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};
