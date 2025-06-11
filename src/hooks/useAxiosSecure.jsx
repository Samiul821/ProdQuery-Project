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
    config.headers.authorization = `Bearer ${user.accessToken}`;
    return config;
  });

  axiosIntance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.status === 401 || error.status === 403) {
        logOut()
          .then(() => {
            toast.warning("Session expired. Log in again");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Sign out filed.");
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosIntance;
};

export default useAxiosSecure;
