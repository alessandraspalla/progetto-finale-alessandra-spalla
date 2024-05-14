import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { Layout } from "./components/Layout/Layout";
import { Login } from "./pages/Login/Login";
import { Registrazione } from "./pages/Registrazione/Registrazione";
import { NotFound } from "./pages/NotFound/NotFound";
import { InfoMeteo } from "./pages/InfoMeteo/InfoMeteo";
import { ProtectedRoute } from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: (
      <AuthContextProvider>
        <Layout />
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        children: [
          {
            path: "",
            element: <Login />,
          },
          {
            path: "reg",
            element: <Registrazione />,
          },
          {
            path: "meteo",
            element: (
              <ProtectedRoute>
                <InfoMeteo />
              </ProtectedRoute>
            ),
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <ToastContainer />
  </>
);
