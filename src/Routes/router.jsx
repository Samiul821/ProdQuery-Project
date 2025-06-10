import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import Queries from '../Pages/Queries'
import AuthLaout from "../Layout/AuthLaout";
import SignIn from '../Pages/SignIn'
import SignUp from "../Pages/SignUp";

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
  {
   path: '/auth', 
   element: <AuthLaout></AuthLaout>,
   children:  [
    {
      path: "/auth/signIn",
      element: <SignIn></SignIn>
    },
    {
      path: '/auth/signUp',
      element: <SignUp></SignUp>
    }
   ]
  }
]);

export default router;
