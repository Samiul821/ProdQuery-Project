import React, { useContext, useState } from "react";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";

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
      className="max-w-3xl w-full mx-auto my-16 px-6 py-10 bg-white/50 backdrop-blur-md rounded-3xl shadow-xl border border-indigo-200 md:px-10"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-10 text-indigo-700 tracking-wide drop-shadow">
        My Profile
      </h2>

      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
        <motion.div
          whileHover={{ scale: 1.08, rotate: 3 }}
          className="rounded-full overflow-hidden w-32 h-32 md:w-40 md:h-40 border-4 border-indigo-400 shadow-xl"
        >
          <img
            src={user?.photoURL || "https://i.ibb.co/6W5zW9y/user-placeholder.png"}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </motion.div>
        <div className="text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-semibold text-indigo-800">
            {user?.displayName || "No Name"}
          </h3>
          <p className="text-indigo-600 text-base md:text-lg mt-2">{user?.email}</p>
        </div>
      </div>

      {/* Toggle Button */}
      <motion.button
        onClick={() => setShowEditForm(!showEditForm)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all mb-8"
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
            className="space-y-6 bg-indigo-50 p-6 md:p-8 rounded-2xl border border-indigo-200 shadow-inner"
          >
            {/* Name */}
            <motion.div
              variants={inputVariants}
              initial="blur"
              animate={focusedInput === "name" ? "focus" : "blur"}
            >
              <label className="block mb-2 text-indigo-700 font-medium">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Enter your name"
                className="w-full px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none"
                required
              />
            </motion.div>

            {/* Photo URL */}
            <motion.div
              variants={inputVariants}
              initial="blur"
              animate={focusedInput === "photo" ? "focus" : "blur"}
            >
              <label className="block mb-2 text-indigo-700 font-medium">Photo URL</label>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                onFocus={() => setFocusedInput("photo")}
                onBlur={() => setFocusedInput(null)}
                placeholder="Paste image URL"
                className="w-full px-5 py-3 border border-indigo-300 rounded-lg focus:outline-none"
                required
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md hover:bg-indigo-800 transition-all"
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
