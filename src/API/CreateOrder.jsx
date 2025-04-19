import axios from "axios";

const BASE_URL = "https://sara545.pythonanywhere.com";

export const CreateOrder = async (item_type, item_id, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/orders/create/`,
      { item_type, item_id },
      {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating order API:", error.response?.data || error.message);
    throw error;
  }
};
