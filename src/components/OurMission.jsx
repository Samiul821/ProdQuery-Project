import React from "react";
import { motion } from "framer-motion";
import missionImg from '../assets/our-mission.avif';

const OurMission = () => {
  return (
    <section
      className="relative rounded-lg shadow-xl overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0,0,0,0.2)),
          url(${missionImg})
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content Wrapper */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">

        {/* Text Content */}
        <motion.div
          className="text-white md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Our Mission
          </h2>
          <p className="mb-6 text-lg md:text-xl leading-relaxed max-w-lg">
            Empowering ethical consumers with knowledge to make conscious choices and promote positive change.
          </p>
          <p className="text-lg md:text-xl leading-relaxed max-w-lg">
            Join us in creating a community that stands for justice, transparency, and conscious consumption.
          </p>
        </motion.div>

        {/* Empty space for balance on md+ screens */}
        <motion.div
          className="md:w-1/2 hidden md:block"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Leave blank or add decorative SVG */}
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
