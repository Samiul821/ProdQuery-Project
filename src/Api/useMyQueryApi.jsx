import useAxiosSecure from "../hooks/useAxiosSecure";

const useMyQueryApi = () => {
  const axiosSecure = useAxiosSecure();

  const myQueryPromise = async (email) => {
    const res = await axiosSecure.get(`/myQuery?email=${email}`);
    return res.data; // should be an array
  };

  return myQueryPromise;
};

export default useMyQueryApi;
