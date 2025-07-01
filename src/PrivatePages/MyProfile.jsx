import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext"; // থিম কনটেক্সট
import { Helmet } from "react-helmet-async";

const containerVariants = {
  hidden: { opacity: 0, y: -40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.3 } },
};

const inputVariants = {
  focus: {
    scale: 1.02,
    boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)",
    transition: { duration: 0.3 },
  },
  blur: {
    scale: 1,
    boxShadow: "none",
    transition: { duration: 0.3 },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
};

const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");
  const [showEditForm, setShowEditForm] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });
      toast.success("✅ Profile updated successfully!");
      setMessage("Profile updated successfully!");
      setShowEditForm(false);
    } catch (error) {
      toast.error("❌ " + error.message);
      setMessage("Failed to update profile.");
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`max-w-3xl w-full mx-auto my-16 px-6 py-10 rounded-3xl shadow-xl border md:px-10 transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 border-gray-700 text-gray-200"
          : "bg-white border-indigo-200 text-gray-900"
      }`}
    >
      <Helmet>
        <title>My Profile | ProdQuery</title>
      </Helmet>

      <h2
        className={`text-3xl md:text-5xl font-bold text-center mb-10 tracking-wide drop-shadow font-poppins ${
          isDark ? "text-indigo-400" : "text-indigo-700"
        }`}
      >
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 3 }}
          className={`rounded-full overflow-hidden w-32 h-32 md:w-40 md:h-40 border-4 shadow-xl transition-colors duration-300 ${
            isDark ? "border-indigo-600" : "border-indigo-400"
          }`}
        >
          <img
            src={
              user?.photoURL || "https://i.ibb.co/6W5zW9y/user-placeholder.png"
            }
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </motion.div>
        <div className={`text-center md:text-left`}>
          <h3
            className={`text-2xl md:text-3xl font-semibold transition-colors duration-300 ${
              isDark ? "text-indigo-300" : "text-indigo-800"
            }`}
          >
            {user?.displayName || "No Name"}
          </h3>
          <p
            className={`text-base md:text-lg mt-2 transition-colors duration-300 ${
              isDark ? "text-indigo-400" : "text-indigo-600"
            }`}
          >
            {user?.email}
          </p>
        </div>
      </div>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setShowEditForm(!showEditForm)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all mb-8 ${
          isDark
            ? "bg-gradient-to-r from-indigo-600 to-indigo-800 text-white hover:brightness-110"
            : "bg-gradient-to-r from-indigo-400 to-indigo-700 text-white hover:brightness-110"
        }`}
      >
        {showEditForm ? "Close Edit" : "Edit Profile"}
      </motion.button>

      {/* Edit Form */}
      <AnimatePresence>
        {showEditForm && (
          <motion.form
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`space-y-6 p-6 md:p-8 rounded-2xl border shadow-inner transition-colors duration-300 ${
              isDark
                ? "bg-gray-800 border-gray-700 text-gray-300"
                : "bg-indigo-50 border-indigo-200 text-gray-900"
            }`}
          >
            {/* Name */}
            <motion.div
              variants={inputVariants}
              initial="blur"
              animate={focusedInput === "name" ? "focus" : "blur"}
            >
              <label
                className={`block mb-2 font-medium transition-colors duration-300 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your name"
                required
                className={`w-full px-5 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-indigo-400"
                    : "bg-white border-indigo-300 text-gray-900 focus:ring-indigo-600"
                }`}
              />
            </motion.div>

            {/* Photo URL */}
            <motion.div
              variants={inputVariants}
              initial="blur"
              animate={focusedInput === "photo" ? "focus" : "blur"}
            >
              <label
                className={`block mb-2 font-medium transition-colors duration-300 ${
                  isDark ? "text-indigo-300" : "text-indigo-700"
                }`}
              >
                Photo URL
              </label>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                onFocus={() => setFocusedInput("photo")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Paste image URL"
                required
                className={`w-full px-5 py-3 rounded-lg border focus:outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-gray-700 border-gray-600 text-gray-300 focus:ring-indigo-400"
                    : "bg-white border-indigo-300 text-gray-900 focus:ring-indigo-600"
                }`}
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full font-bold py-3 rounded-xl shadow-md transition-all ${
                isDark
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-indigo-700 hover:bg-indigo-800 text-white"
              }`}
            >
              Save Changes
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Message */}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-600 font-semibold mt-6"
        >
          {message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default MyProfile;
