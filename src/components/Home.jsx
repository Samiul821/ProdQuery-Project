import React, { Suspense } from "react";
import RecentQuery from "./RecentQuery";
import Loading from "./Loading";

const recentQueryPromise = fetch("https://prod-query-backend.vercel.app/querys/recent").then(
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
