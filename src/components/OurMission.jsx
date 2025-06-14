import React from "react";
import { motion } from "framer-motion";

const OurMission = () => {
  return (
    <section className="bg-gray-800 text-gray-200 py-12 px-6 md:px-16 rounded-lg shadow-lg max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8">
        
        {/* Text Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-base leading-relaxed mb-3 text-gray-300">
            We built this platform to empower ethical consumers and raise awareness 
            about the impact of their choices. Our goal is to provide a space where 
            people can share knowledge about products, boycott harmful brands, and 
            promote positive change.
          </p>
          <p className="text-base leading-relaxed mb-3 text-gray-300">
            Our vision is a world where every consumer’s voice can influence the 
            marketplace towards fairness, transparency, and sustainability.
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            Join us in creating a community that stands for justice, transparency, 
            and conscious consumption.
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://undraw.co/api/illustrations/ethical_shopping.svg"
            alt="Ethical shopping illustration"
            className="w-full max-w-sm mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
