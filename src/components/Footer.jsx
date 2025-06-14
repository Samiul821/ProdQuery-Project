import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-10 px-[4%] lg:px-[10%]">
      <motion.div
        className=" grid md:grid-cols-3 gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Brand Info */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 font-poppins">ProdQuery</h3>
          <p className="text-sm text-gray-400">
            Empowering consumers through transparency. Join our mission to make
            ethical choices easier and more accessible.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4 font-poppins">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/queries" className="hover:text-white">
                Browse Queries
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                About
              </a>
            </li>

            <li>
              <a href="/FAQ" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-xl font-semibold text-white mb-4 font-poppins">
            Connect With Us
          </h4>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/smsamiul890"
              target="_blank"
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-600 transition"
              aria-label="Facebook"
            >
              <FaFacebookF className="text-white" />
            </a>
            <a
              href="https://x.com/SmSamiul890" target="_blank"
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-400 transition"
              aria-label="Twitter"
            >
              <FaTwitter className="text-white" />
            </a>
            <a
              href="https://github.com/Samiul821" target="_blank"
              className="bg-gray-800 p-2 rounded-full hover:bg-gray-600 transition"
              aria-label="GitHub"
            >
              <FaGithub className="text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/samiul-islam-40942a34a" target="_blank"
              className="bg-gray-800 p-2 rounded-full hover:bg-blue-700 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="text-white" />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="mt-12 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        © {new Date().getFullYear()} ProdQuery. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
