import React, { Suspense } from "react";
import RecentQuery from "./RecentQuery";
import Loading from "./Loading";

const recentQueryPromise = fetch("http://localhost:5000/querys/recent").then(
  (res) => res.json()
);

const Home = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <RecentQuery recentQueryPromise={recentQueryPromise}></RecentQuery>
      </Suspense>
    </div>
  );
};

export default Home;
