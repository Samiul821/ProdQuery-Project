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

const formVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 10, transition: { duration: 0.3 } },
};

const inputVariants = {
  focus: {
    scale: 1.03,
    boxShadow: "0 0 8px rgba(99, 102, 241, 0.6)", // indigo-500 glow
    transition: { duration: 0.3 },
  },
  blur: {
    scale: 1,
    boxShadow: "none",
    transition: { duration: 0.3 },
  },
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
      setMessage("Profile updated successfully!");
      toast.success("Profile updated successfully!");
      setShowEditForm(false);
    } catch (error) {
      setMessage("Failed to update profile.");
      toast.error(error.message);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-md mx-auto mt-16 p-10 bg-gradient-to-br from-indigo-100 via-indigo-50 to-white rounded-3xl shadow-2xl border border-indigo-300"
    >
      <h2 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 tracking-wide drop-shadow-md">
        My Profile
      </h2>

      {/* Profile Info Section */}
      <div className="flex items-center space-x-8 mb-10">
        <motion.div
          whileHover={{ scale: 1.12, rotate: 6, boxShadow: "0 0 15px rgba(99, 102, 241, 0.7)" }}
          className="avatar cursor-pointer rounded-full overflow-hidden border-4 border-indigo-400 shadow-xl w-32 h-32"
        >
          <img
            src={user?.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </motion.div>
        <div>
          <h3 className="text-2xl font-semibold text-indigo-900 drop-shadow-sm">
            {user?.displayName || "No Name"}
          </h3>
          <p className="text-indigo-600 text-lg font-medium tracking-wide">{user?.email}</p>
        </div>
      </div>

      {/* Edit Profile Button */}
      <motion.button
        onClick={() => setShowEditForm((prev) => !prev)}
        whileHover={{ scale: 1.07, boxShadow: "0 0 12px rgba(99, 102, 241, 0.8)" }}
        whileTap={{ scale: 0.95 }}
        className="btn w-full py-3 rounded-xl font-extrabold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all duration-300 mb-10"
      >
        {showEditForm ? "Close Edit" : "Edit Profile"}
      </motion.button>

      {/* Edit Form */}
      <AnimatePresence>
        {showEditForm && (
          <motion.form
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-8 bg-indigo-50 rounded-2xl p-8 shadow-inner"
          >
            <motion.div
              className="form-control"
              initial="blur"
              animate={focusedInput === "name" ? "focus" : "blur"}
              variants={inputVariants}
            >
              <label className="label font-semibold text-indigo-800 tracking-wide">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
                required
                placeholder="Enter your name"
                className="input input-bordered w-full px-6 py-3 rounded-lg border-indigo-300 focus:outline-none"
              />
            </motion.div>

            <motion.div
              className="form-control"
              initial="blur"
              animate={focusedInput === "photo" ? "focus" : "blur"}
              variants={inputVariants}
            >
              <label className="label font-semibold text-indigo-800 tracking-wide">
                Photo URL
              </label>
              <input
                type="url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                onFocus={() => setFocusedInput("photo")}
                onBlur={() => setFocusedInput(null)}
                required
                placeholder="Enter your photo URL"
                className="input input-bordered w-full px-6 py-3 rounded-lg border-indigo-300 focus:outline-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(79, 70, 229, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              className="btn w-full py-3 rounded-xl font-extrabold bg-indigo-700 hover:bg-indigo-800 text-white shadow-lg transition-all duration-300"
            >
              Save Changes
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Update message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center text-green-700 font-semibold text-lg select-none drop-shadow-md"
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyProfile;
