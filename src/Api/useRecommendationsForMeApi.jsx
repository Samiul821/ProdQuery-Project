import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const useRecommendationsForMeApi = () => {
  const axiosSecure = useAxiosSecure();

  const recommendationsForMePromise = async (email) => {
    return axiosSecure
      .get(`/recommendations-for-me?email=${email}`)
      .then((res) => res.data);
    // const res = await axiosSecure.get(`/recommendations-for-me?email=${email}`);
    // return res.data;
  };

  return recommendationsForMePromise;
};

export default useRecommendationsForMeApi;
