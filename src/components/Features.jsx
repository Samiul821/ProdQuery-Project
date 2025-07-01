import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeContext";

const featuresData = [
  {
    id: 1,
    title: "Trusted Reviews",
    description:
      "Verified user reviews help you make confident buying decisions.",
    icon: "🛡️",
  },
  {
    id: 2,
    title: "Community Powered",
    description: "A platform built and improved by a passionate community.",
    icon: "👥",
  },
  {
    id: 3,
    title: "Ethical Choices",
    description:
      "Discover which brands support fair and sustainable practices.",
    icon: "🌱",
  },
  {
    id: 4,
    title: "Real-Time Updates",
    description: "Stay updated with the latest product queries and reports.",
    icon: "⏰",
  },
  {
    id: 5,
    title: "Easy To Use",
    description:
      "User-friendly interface makes browsing and sharing effortless.",
    icon: "👍",
  },
  {
    id: 6,
    title: "Secure & Private",
    description: "Your data and privacy are our top priority.",
    icon: "🔒",
  },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const FeaturesSection = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <section
      className={`max-w-7xl mx-auto px-6 py-16 ${isDark ? "bg-gray-900" : ""}`}
    >
      <h2
        className={`text-4xl font-semibold mb-12 text-center font-poppins ${
          isDark ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Why Choose Us
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {featuresData.map(({ id, title, description, icon }) => (
          <motion.div
            key={id}
            className={`rounded-lg p-6 cursor-pointer transition-shadow duration-300 ${
              isDark
                ? "bg-gray-800 shadow-md hover:shadow-indigo-700/50 text-gray-200"
                : "bg-white shadow-md hover:shadow-xl text-gray-800"
            }`}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-medium mb-2 font-poppins">{title}</h3>
            <p className="text-gray-400">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
