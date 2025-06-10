import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Logout failed. Please try again.");
      });
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
          <NavLink
            to="/"
            className="text-indigo-700 font-extrabold text-3xl tracking-wide hover:text-indigo-900 transition duration-300 select-none"
          >
            ProdQuery
          </NavLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex space-x-12">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/queries" className={getNavLinkClass}>
              Queries
            </NavLink>
            {user && (
              <>
                <NavLink to="/recommendationsForMe" className={getNavLinkClass}>
                  Recommendations For Me
                </NavLink>
                <NavLink to="/myQueries" className={getNavLinkClass}>
                  My Queries
                </NavLink>
                <NavLink to="/myRecommendations" className={getNavLinkClass}>
                  My Recommendations
                </NavLink>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {!user ? (
              <Link
                to="/auth/signIn"
                className="inline-block px-6 py-2 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition duration-300"
              >
                Login
              </Link>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full border border-indigo-300"
                  />
                  <span className="font-medium text-gray-700">
                    {user.displayName}
                  </span>
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50 border">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-indigo-50 text-sm text-gray-700"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 hover:bg-indigo-50 text-sm text-gray-700"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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

              {user && (
                <>
                  <NavLink
                    to="/recommendationsForMe"
                    className={({ isActive }) =>
                      `block px-5 py-3 rounded-md transition duration-300 ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    Recommendations For Me
                  </NavLink>
                  <NavLink
                    to="/myQueries"
                    className={({ isActive }) =>
                      `block px-5 py-3 rounded-md transition duration-300 ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    My Queries
                  </NavLink>
                  <NavLink
                    to="/myRecommendations"
                    className={({ isActive }) =>
                      `block px-5 py-3 rounded-md transition duration-300 ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "hover:bg-indigo-50 hover:text-indigo-600"
                      }`
                    }
                  >
                    My Recommendations
                  </NavLink>
                </>
              )}

              {!user ? (
                <NavLink
                  to="/auth/signIn"
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-3 rounded-md bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300"
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="block px-5 py-3 hover:bg-indigo-50 text-sm text-gray-700"
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-5 py-3 hover:bg-indigo-50 text-sm text-gray-700"
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-5 py-3 hover:bg-red-50 text-sm text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
