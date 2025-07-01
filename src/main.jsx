import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/router.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "./Provider/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" />
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  </StrictMode>
);
