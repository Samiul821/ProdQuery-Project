import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const About = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <section
      className={`py-16 px-4 md:px-16 min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      }`}
    >
      <Helmet>
        <title>About | ProdQuery</title>
      </Helmet>
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className={`text-4xl md:text-5xl font-bold mb-6 text-center font-poppins ${
            isDark ? "text-indigo-400" : ""
          }`}
        >
          About ProdQuery
        </h1>
        <p
          className={`text-lg leading-relaxed text-center max-w-3xl mx-auto mb-12 ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          ProdQuery is a platform built to empower consumers by providing
          transparent information about products, brands, and ethical concerns.
          In a world where every purchase matters, we help you make informed
          decisions that align with your values.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              desc: "To provide a space where users can share queries, expose unethical brands, and promote conscious consumerism.",
            },
            {
              title: "Why ProdQuery?",
              desc: "We believe awareness is power. With crowd-sourced product insights, consumers can boycott harmful brands and support ethical alternatives.",
            },
            {
              title: "Get Involved",
              desc: "Join the movement — submit queries, share experiences, and help create a more transparent and fair marketplace for everyone.",
            },
          ].map(({ title, desc }) => (
            <motion.div
              key={title}
              className={`p-6 rounded-lg shadow transition-colors duration-300 ${
                isDark
                  ? "bg-gray-800 text-gray-300 shadow-gray-700"
                  : "bg-gray-100 text-gray-700"
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
