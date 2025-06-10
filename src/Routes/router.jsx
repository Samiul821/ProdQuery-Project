import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../components/Home";
import Queries from "../Pages/Queries";
import AuthLaout from "../Layout/AuthLaout";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import PrivateRoute from "../Provider/PrivateRoute";
import MyProfile from "../PrivatePages/MyProfile";
import RecommendatForMe from "../PrivatePages/RecommendatForMe";
import MyQueries from '../PrivatePages/MyQueries/MyQueries'
import MyRecommendations from '../PrivatePages/MyRecommendations'

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
      },
      {
        path: "/queries",
        element: <Queries></Queries>,
      },
      {
        path: "/recommendationsForMe",
        element: (
          <PrivateRoute>
            <RecommendatForMe></RecommendatForMe>
          </PrivateRoute>
        ),
      },
      {
       path: "/myQueries",
       element: (
        <PrivateRoute>
          <MyQueries></MyQueries>
        </PrivateRoute>
       )
      },
      {
        path: '/myRecommendations',
        element: (
          <PrivateRoute>
            <MyRecommendations></MyRecommendations>
          </PrivateRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLaout></AuthLaout>,
    children: [
      {
        path: "/auth/signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "/auth/signUp",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

export default router;
