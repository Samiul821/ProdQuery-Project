import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { ThemeContext } from "../Provider/ThemeContext";

const Footer = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <footer
      className={`pt-16 pb-10 px-[4%] lg:px-[10%] border-t ${
        isDark
          ? "border-gray-700 bg-gray-900 text-gray-300"
          : "border-gray-300 bg-gray-100 text-gray-700"
      }`}
    >
      <motion.div
        className="grid md:grid-cols-3 gap-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Brand Info */}
        <div>
          <h3
            className={`text-3xl font-extrabold mb-4 font-poppins ${
              isDark ? "text-cyan-400" : "text-blue-600"
            }`}
          >
            ProdQuery
          </h3>
          <p
            className={`text-sm leading-relaxed max-w-md ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Empowering consumers through transparency. Join our mission to make
            ethical choices easier and more accessible.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4
            className={`text-xl font-semibold mb-4 font-poppins ${
              isDark ? "text-cyan-300" : "text-blue-700"
            }`}
          >
            Quick Links
          </h4>
          <ul className="space-y-3 text-sm">
            {[
              { label: "Home", href: "/" },
              { label: "Browse Queries", href: "/queries" },
              { label: "About", href: "/about" },
              { label: "FAQ", href: "/FAQ" },
              { label: "Terms & Conditions", href: "/terms" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`transition duration-300 hover:${
                    isDark ? "text-cyan-400" : "text-blue-600"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4
            className={`text-xl font-semibold mb-4 font-poppins ${
              isDark ? "text-cyan-300" : "text-blue-700"
            }`}
          >
            Connect With Us
          </h4>
          <div className="flex space-x-5">
            <a
              href="https://www.facebook.com/smsamiul890"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full shadow-md transition duration-300 ${
                isDark
                  ? "bg-gray-800 hover:bg-cyan-600"
                  : "bg-gray-200 hover:bg-blue-400"
              }`}
              aria-label="Facebook"
            >
              <FaFacebookF
                className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}
              />
            </a>
            <a
              href="https://x.com/SmSamiul890"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full shadow-md transition duration-300 ${
                isDark
                  ? "bg-gray-800 hover:bg-cyan-400"
                  : "bg-gray-200 hover:bg-blue-300"
              }`}
              aria-label="Twitter"
            >
              <FaTwitter
                className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}
              />
            </a>
            <a
              href="https://github.com/Samiul821"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full shadow-md transition duration-300 ${
                isDark
                  ? "bg-gray-800 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-400"
              }`}
              aria-label="GitHub"
            >
              <FaGithub
                className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/samiul-islam-40942a34a"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 rounded-full shadow-md transition duration-300 ${
                isDark
                  ? "bg-gray-800 hover:bg-cyan-700"
                  : "bg-gray-200 hover:bg-blue-700"
              }`}
              aria-label="LinkedIn"
            >
              <FaLinkedinIn
                className={`text-lg ${isDark ? "text-white" : "text-gray-900"}`}
              />
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={`mt-12 text-center text-sm ${
          isDark ? "text-gray-500" : "text-gray-600"
        }`}
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
