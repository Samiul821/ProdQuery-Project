import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useMyRecommendationApi = () => {
  const axiosSecure = useAxiosSecure();

  const myRecommendationsPromise = async (email) => {
    const res = await axiosSecure.get(`/my-recommendations?email=${email}`);
    return res.data;
  };

  return myRecommendationsPromise;
};

export default useMyRecommendationApi;
