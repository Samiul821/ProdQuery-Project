import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { ThemeContext } from "../Provider/ThemeContext";
import NavLog from "../assets/Nav logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully!");
        navigate("/");
      })
      .catch(() => {
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
        ? `${
            isDark
              ? "text-cyan-300 after:bg-cyan-300"
              : "text-blue-600 after:bg-blue-600"
          } after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5`
        : `${
            isDark
              ? "text-gray-400 hover:text-cyan-300 hover:after:bg-cyan-500"
              : "text-gray-700 hover:text-blue-600 hover:after:bg-blue-300"
          } hover:after:absolute hover:after:left-0 hover:after:bottom-0 hover:after:w-full hover:after:h-0.5`
    }`;

  return (
    <nav
      className={`${
        isDark
          ? "fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50 text-gray-300 border-b border-gray-700"
          : "fixed top-0 left-0 right-0 bg-gray-100 shadow-md z-50 text-gray-800 border-b border-gray-300"
      }`}
    >
      <div className="px-[4%] lg:px-[10%]">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src={NavLog}
              alt="ProdQuery Logo"
              className="h-32 w-auto object-contain drop-shadow-sm"
            />
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-12">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <NavLink to="/queries" className={getNavLinkClass}>
              Query
            </NavLink>
            {user && (
              <>
                <NavLink to="/myQueries" className={getNavLinkClass}>
                  Mine
                </NavLink>
                <NavLink to="/myRecommendations" className={getNavLinkClass}>
                  My Recs
                </NavLink>
                <NavLink to="/recommendationsForMe" className={getNavLinkClass}>
                  For Me
                </NavLink>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded-md text-sm font-semibold border transition ${
              isDark
                ? "border-gray-600 hover:bg-gray-800"
                : "border-gray-300 hover:bg-gray-100"
            }`}
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          {/* User Auth */}
          <div className="hidden lg:flex items-center space-x-4 relative">
            {!user ? (
              <Link
                to="/auth/signIn"
                className="inline-block px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition duration-300"
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
                    className="w-10 h-10 rounded-full border border-gray-600"
                  />
                  <span
                    className={`font-medium ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {user.displayName}
                  </span>
                </button>

                {showDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-44 rounded-md shadow-lg border z-50 ${
                      isDark
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Link
                      to="/profile"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Profile
                    </Link>
                    {/* <Link
                      to="/dashboard"
                      className={`block px-4 py-2 text-sm ${
                        isDark
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Dashboard
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        isDark
                          ? "text-red-400 hover:bg-red-900"
                          : "text-red-600 hover:bg-red-50"
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none focus:ring-2 focus:ring-indigo-700 rounded ${
                isDark ? "text-indigo-600" : "text-gray-700"
              }`}
            >
              {isOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className={`lg:hidden mt-4 pt-4 space-y-3 font-semibold border-t ${
                isDark
                  ? "text-gray-300 border-gray-700"
                  : "text-gray-700 border-gray-200"
              }`}
            >
              {[
                { label: "Home", path: "/" },
                { label: "Queries", path: "/queries" },
                ...(user
                  ? [
                      { label: "My Queries", path: "/myQueries" },
                      {
                        label: "My Recommendations",
                        path: "/myRecommendations",
                      },
                      {
                        label: "Recommendations For Me",
                        path: "/recommendationsForMe",
                      },
                    ]
                  : []),
              ].map(({ label, path }) => (
                <NavLink
                  key={label}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-5 py-3 rounded-md transition duration-300 ${
                      isActive
                        ? "bg-cyan-600 text-white"
                        : isDark
                        ? "hover:bg-gray-700 hover:text-indigo-600"
                        : "hover:bg-cyan-50 hover:text-indigo-700"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              {!user ? (
                <NavLink
                  to="/auth/signIn"
                  onClick={() => setIsOpen(false)}
                  className="block px-5 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300"
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3 text-sm ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Profile
                  </NavLink>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-3 text-sm ${
                      isDark
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-5 py-3 text-sm ${
                      isDark
                        ? "text-red-400 hover:bg-red-900"
                        : "text-red-600 hover:bg-red-50"
                    }`}
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
