import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4 md:px-16 min-h-screen">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
          About ProdQuery
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 text-center max-w-3xl mx-auto">
          ProdQuery is a platform built to empower consumers by providing transparent
          information about products, brands, and ethical concerns. In a world where
          every purchase matters, we help you make informed decisions that align with
          your values.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-sm text-gray-600">
              To provide a space where users can share queries, expose unethical
              brands, and promote conscious consumerism.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">Why ProdQuery?</h3>
            <p className="text-sm text-gray-600">
              We believe awareness is power. With crowd-sourced product insights,
              consumers can boycott harmful brands and support ethical alternatives.
            </p>
          </motion.div>

          <motion.div
            className="bg-gray-100 p-6 rounded-lg shadow"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-2">Get Involved</h3>
            <p className="text-sm text-gray-600">
              Join the movement — submit queries, share experiences, and help create
              a more transparent and fair marketplace for everyone.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
