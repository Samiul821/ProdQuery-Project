import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Slider from "./Slider";
import OurMission from "./OurMission";
import RecentQueryCard from "./RecentQueryCard";
import FeaturesSection from "./Features";
import { ThemeContext } from "../Provider/ThemeContext";
import HighlightedProducts from "./HighlightedProduts";

const Home = () => {
  const recentQuery = useLoaderData();
  const { isDark } = useContext(ThemeContext);

  return (
    <main
      className={`min-h-screen space-y-16 pb-16 pt-6 px-[5%] lg:px-[10%] ${
        isDark
          ? "bg-gradient-to-b from-[#1f2937] via-[#111827] to-[#0f172a] text-gray-200"
          : "bg-gradient-to-br from-[#f0fdf4] to-white text-gray-800"
      }`}
    >
      <Helmet>
        <title>Home | ProdQuery</title>
      </Helmet>

      <header>
        <Slider />
      </header>

      <section>
        <div>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="text-center mb-14 px-2"
          >
            <div className="group flex justify-center">
              <h1
                className={`text-3xl md:text-4xl xl:text-5xl font-extrabold flex items-center justify-center gap-3 font-poppins relative cursor-pointer ${
                  isDark ? "text-white" : "text-gray-800"
                }`}
              >
                Recent Queries
                <span
                  className={`absolute bottom-0 left-0 w-0 h-1 rounded-full transition-all duration-500 ease-in-out ${
                    isDark ? "bg-cyan-400" : "bg-indigo-600"
                  } group-hover:w-full`}
                />
              </h1>
            </div>

            <p
              className={`text-base md:text-lg mt-3 max-w-3xl mx-auto ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Discover alternative products shared by our conscious community
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          >
            {recentQuery.map((query) => (
              <RecentQueryCard key={query._id} query={query} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <HighlightedProducts></HighlightedProducts>
      </section>

      <section data-aos="fade-up" data-aos-duration="2000">
        <FeaturesSection />
      </section>

      <section data-aos="fade-up" data-aos-duration="2000">
        <OurMission />
      </section>
  
    </main>
  );
};

export default Home;
