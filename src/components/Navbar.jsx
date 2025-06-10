import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const getNavLinkClass = ({ isActive }) =>
    `relative px-3 py-2 font-medium transition duration-300 ${
      isActive
        ? "text-indigo-600 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-indigo-600"
        : "text-gray-700 hover:text-indigo-600 hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-indigo-300"
    }`;

  return (
    <nav className="bg-gray-50 shadow-md sticky top-0 z-50">
      <div className="px-[4%] lg:px-[10%]">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-indigo-700 font-extrabold text-3xl tracking-wide hover:text-indigo-900 transition duration-300 select-none"
          >
            ProdQuery
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-12">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/queries" className={getNavLinkClass}>
              Queries
            </NavLink>
          </div>
          {/* Theme toggle button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-4 px-3 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>

          {/* Desktop Login Button */}
          <div className="hidden lg:flex">
            <Link
              to="/login"
              className="inline-block px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition duration-300 select-none"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 rounded"
            >
              {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="lg:hidden mt-4 border-t border-gray-200 pt-4 space-y-3 font-semibold text-gray-700"
            >
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-3 rounded-md transition duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/queries"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-3 rounded-md transition duration-300 ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-50 hover:text-indigo-600"
                  }`
                }
              >
                Queries
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-5 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
              >
                Login
              </NavLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
