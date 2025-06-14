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
import MyQueries from "../PrivatePages/MyQueries/MyQueries";
import MyRecommendations from "../PrivatePages/MyRecommendations";
import AddQueries from "../PrivatePages/MyQueries/AddQueries";
import Loading from "../components/Loading";
import QueryDetails from "../PrivatePages/QueryDetails";
import MyQueryDetails from "../PrivatePages/MyQueries/MyQueryDetails";
import QueryUpdated from "../PrivatePages/MyQueries/QueryUpdated";
import About from "../Pages/About";
import FAQSection from "../components/FAQSection";
import TermsAndConditions from "../Pages/TermsAndConditions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        index: true,
        Component: Home,
        loader: () => fetch("http://localhost:5000/querys/recent"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/queries",
        element: <Queries></Queries>,
        loader: () => fetch("http://localhost:5000/allQuery"),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/query/:id",
        element: (
          <PrivateRoute>
            <QueryDetails></QueryDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/queryDetails/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
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
        ),
      },
      {
        path: "/myQueryDetails/:id",
        element: (
          <PrivateRoute>
            <MyQueryDetails></MyQueryDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/myQueryDetails/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/update-query/:id",
        element: (
          <PrivateRoute>
            <QueryUpdated></QueryUpdated>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/myQueryDetails/${params.id}`),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/addQuerie",
        element: (
          <PrivateRoute>
            <AddQueries></AddQueries>
          </PrivateRoute>
        ),
      },
      {
        path: "/myRecommendations",
        element: (
          <PrivateRoute>
            <MyRecommendations></MyRecommendations>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/FAQ",
        element: <FAQSection></FAQSection>,
      },
      {
        path: "/terms",
        element: <TermsAndConditions></TermsAndConditions>,
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
