import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Components/Auth/AuthProvider.jsx";
import { OrderProvider } from "./Context/OrderContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </AuthProvider>
  </StrictMode>
);
