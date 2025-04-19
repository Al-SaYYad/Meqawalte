/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);
    Cookies.set("user", encodeURIComponent(JSON.stringify(userData)), {
      expires: 7,
    });
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("user");
  };

  useEffect(() => {
    const cookieUser = Cookies.get("user");
    if (cookieUser) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(cookieUser));
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse cookie user:", err);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
