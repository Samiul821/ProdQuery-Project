import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import Queries from '../Pages/Queries'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        index: true,
        Component: Home,
      },
      {
        path: "/queries",
        element: <Queries></Queries>
      },
    ],
  },
]);

export default router;
