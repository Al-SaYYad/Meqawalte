import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const RegisterUser = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/register/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("❌ Registration error:", err);
    throw err.response?.data || { message: "Registration failed" };
  }
};
