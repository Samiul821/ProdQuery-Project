import axios from "axios";
import React from "react";
import useAuth from "./useAuth";
import { toast } from "react-toastify";

const axiosIntance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  axiosIntance.interceptors.request.use((config) => {
    if (user?.accessToken) {
      config.headers.authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  });

  axiosIntance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        logOut()
          .then(() => {
            toast.warning("Session expired. Please log in again.");
          })
          .catch((err) => {
            console.error("Logout failed:", err);
            toast.error("Something went wrong during logout.");
          });
      }

      return Promise.reject(error);
    }
  );

  return axiosIntance;
};

export default useAxiosSecure;
