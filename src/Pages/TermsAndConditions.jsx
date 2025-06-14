import React from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
  return (
    <section className="bg-white text-gray-800 py-16 px-4 md:px-16 min-h-screen">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center font-poppins">
          Terms & Conditions
        </h1>

        <div className="space-y-6 text-gray-700 text-sm md:text-base">
          <p>
            Welcome to ProdQuery. These terms and conditions outline the rules and regulations for the use of our platform.
          </p>

          <h2 className="text-xl font-medium mt-8 font-poppins">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ProdQuery, you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, you must not use this website.
          </p>

          <h2 className="text-xl font-medium mt-8 font-poppins">2. User Responsibilities</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>You are responsible for maintaining the confidentiality of your account information.</li>
            <li>You agree to provide accurate, current, and complete information when using the platform.</li>
            <li>You must not use the platform for any illegal or unauthorized purpose.</li>
          </ul>

          <h2 className="text-xl font-medium mt-8 font-poppins">3. Content Ownership</h2>
          <p>
            All content submitted by users remains their property. However, by posting on ProdQuery, you grant us a non-exclusive license to use, display, and distribute the content for platform-related purposes.
          </p>

          <h2 className="text-xl font-medium mt-8 font-poppins">4. Limitation of Liability</h2>
          <p>
            ProdQuery is not liable for any direct, indirect, or consequential loss or damage incurred by users in connection with the use of our platform.
          </p>

          <h2 className="text-xl font-medium mt-8 font-poppins">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms & Conditions at any time. Changes will be posted on this page with an updated revision date.
          </p>

          <p className="mt-10">
            By continuing to use ProdQuery after changes are made, you agree to be bound by the revised terms.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;
