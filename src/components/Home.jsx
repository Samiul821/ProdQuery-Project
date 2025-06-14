import React from "react";

import Slider from "./Slider";
import OurMission from "./OurMission";
import { useLoaderData } from "react-router-dom";
import RecentQueryCard from "./RecentQueryCard";
import OurValues from "./FAQSection";
import FeaturesSection from "./Features";

const Home = () => {
  const recentQuery = useLoaderData();

  return (
    <main className="px-[4%] lg:px-[10%] py-8 bg-gradient-to-br from-[#f0fdf4] to-white space-y-10">
      <header>
        <Slider></Slider>
      </header>

      <section>
        <div>
          <div className="text-center mb-14 px-2">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-800 flex items-center justify-center gap-3">
              Recent Queries
            </h1>
            <p className="text-gray-500 text-base md:text-lg mt-3 max-w-3xl mx-auto">
              Discover alternative products shared by our conscious community
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {recentQuery.map((recentQuery) => (
              <RecentQueryCard key={recentQuery._id} query={recentQuery} />
            ))}
          </div>
        </div>
      </section>
      <section>
       <FeaturesSection></FeaturesSection>
      </section>
      <section>
        <OurMission></OurMission>
      </section>
    </main>
  );
};

export default Home;
