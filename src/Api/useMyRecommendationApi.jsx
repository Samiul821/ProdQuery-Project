import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useMyRecommendationApi = () => {
  const axiosSecure = useAxiosSecure();

  const myRecommendationsPromise = async (email) => {
    return axiosSecure
      .get(`/my-recommendations?email=${email}`)
      .then((res) => res.data);
  };

  return myRecommendationsPromise;
};

export default useMyRecommendationApi;
