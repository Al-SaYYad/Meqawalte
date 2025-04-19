/* eslint-disable react/prop-types */
import {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import { CreateOrder as apiCreateOrder } from "../API/CreateOrder";

const BASE_URL = "https://sara545.pythonanywhere.com";
const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [incomingOrders, setIncomingOrders] = useState([]);

  const fetchMyPurchases = useCallback(async (token) => {
    if (!token) {
      console.warn("No token provided for fetching purchases.");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/orders/my-purchases/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching my purchases:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  }, []);

  const fetchIncomingOrders = useCallback(async (token) => {
    if (!token) {
      console.warn("No token provided for fetching incoming orders.");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/orders/incoming/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setIncomingOrders(response.data);
    } catch (error) {
      console.error("Error fetching incoming orders:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
    }
  }, []);

  const createOrder = useCallback(async (itemType, itemId, token) => {
    if (!token) {
      console.warn("No token provided for creating an order.");
      return;
    }

    try {
      const newOrder = await apiCreateOrder(itemType, itemId, token);
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (error) {
      console.error("Error creating order:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  }, []);

  const fetchAllOrders = useCallback(
    async (token) => {
      await fetchMyPurchases(token);
      await fetchIncomingOrders(token);
    },
    [fetchMyPurchases, fetchIncomingOrders]
  );

  const value = useMemo(
    () => ({
      orders,
      incomingOrders,
      fetchAllOrders,
      createOrder,
    }),
    [orders, incomingOrders, fetchAllOrders, createOrder]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
