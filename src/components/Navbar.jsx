import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        className="relative group px-1 py-2 hover:text-indigo-600 transition duration-300"
      >
        Home
        <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-indigo-600 rounded"></span>
      </NavLink>
      <NavLink
        to="/queries"
        className="relative group px-1 py-2 hover:text-indigo-600 transition duration-300"
      >
        Queries
        <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-indigo-600 rounded"></span>
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo/Name */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-indigo-700 font-extrabold text-3xl tracking-wide hover:text-indigo-900 transition duration-300 select-none"
            >
              ProdQuery
            </Link>
          </div>

          {/* Center - Nav Links (lg and above) */}
          <div className="hidden lg:flex space-x-12 font-semibold text-gray-700">
            {navItems}
          </div>

          {/* Right - Login Button (lg and above) */}
          <div className="hidden lg:flex">
            <Link
              to="/login"
              className="inline-block px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition duration-300 select-none"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Button (md and below) */}
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

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="lg:hidden mt-3 space-y-4 pb-6 border-t border-gray-200 font-semibold text-gray-700 relative"
            >
              {["/", "/queries", "/login"].map((path, i) => {
                const name =
                  path === "/"
                    ? "Home"
                    : path === "/queries"
                    ? "Queries"
                    : "Login";
                const isLogin = path === "/login";

                return (
                  <Link
                    key={i}
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={`relative block px-5 py-3 rounded-md transition duration-300 ${
                      isLogin
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "hover:bg-indigo-50 hover:text-indigo-600"
                    } group`}
                  >
                    {name}
                    {!isLogin && (
                      <span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-indigo-600 rounded absolute left-5 bottom-2"></span>
                    )}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
