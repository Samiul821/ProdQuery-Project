import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signUpLottie from "../../public/SignUp.json";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeContext";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, updateUser, setUser, googleSignIn } =
    useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo } = Object.fromEntries(
      formData.entries()
    );

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }
    if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
      toast.error("Password must contain at least one special character.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });

            Swal.fire({
              title: "Registration Successful!",
              text: "Your account has been created.",
              icon: "success",
              confirmButtonColor: "#14b8a6",
              confirmButtonText: "Okay",
            });

            form.reset();
            navigate(location.state || "/", { replace: true });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Profile update failed.");
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Oops!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#f43f5e",
          confirmButtonText: "Try Again",
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const redirectPath = location?.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
      Swal.fire({
        title: "Google Sign In Successful",
        icon: "success",
        confirmButtonColor: "#14b8a6",
        confirmButtonText: "Okay",
      });
    });
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-[4%] lg:px-[10%] py-10 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-tr from-pink-100 via-purple-100 to-indigo-100"
      }`}
    >
      <Helmet>
        <title>Sign Up | ProdQuery</title>
      </Helmet>

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`w-full max-w-5xl rounded-3xl shadow-2xl p-6 md:p-10 lg:p-12 flex flex-col-reverse md:flex-row gap-10 items-center transition-colors duration-300 ${
          isDark
            ? "bg-gray-800 text-gray-200 border border-gray-600"
            : "bg-white/80 backdrop-blur-xl"
        }`}
      >
        {/* Left - Form */}
        <div className="w-full md:w-1/2">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left font-poppins ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Create Your Free Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                className={`block mb-1 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-xl border text-sm placeholder-gray-400 transition focus:outline-none focus:ring-4 ${
                  isDark
                    ? "bg-gray-900 border-gray-600 text-white focus:ring-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-400"
                }`}
              />
            </div>

            {/* Photo URL */}
            <div>
              <label
                className={`block mb-1 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photo"
                name="photo"
                placeholder="https://example.com/photo.jpg"
                className={`w-full px-4 py-3 rounded-xl border text-sm placeholder-gray-400 transition focus:outline-none focus:ring-4 ${
                  isDark
                    ? "bg-gray-900 border-gray-600 text-white focus:ring-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-400"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label
                className={`block mb-1 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm placeholder-gray-400 transition focus:outline-none focus:ring-4 ${
                  isDark
                    ? "bg-gray-900 border-gray-600 text-white focus:ring-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-400"
                }`}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                className={`block mb-1 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm placeholder-gray-400 transition focus:outline-none focus:ring-4 ${
                  isDark
                    ? "bg-gray-900 border-gray-600 text-white focus:ring-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-400"
                }`}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-9 cursor-pointer text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </span>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Sign Up
            </motion.button>
          </form>

          {/* Google Sign Up */}
          <div className="mt-6">
            <motion.button
              onClick={handleGoogleSignIn}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className={`w-full flex items-center justify-center gap-3 font-semibold py-3 rounded-xl shadow-sm transition focus:outline-none focus:ring-4 ${
                isDark
                  ? "bg-gray-700 text-gray-200 border border-gray-600 hover:bg-gray-600 focus:ring-indigo-500"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-indigo-200"
              }`}
            >
              <FcGoogle size={22} />
              Sign up with Google
            </motion.button>
          </div>

          <p
            className={`text-center mt-6 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/auth/signIn"
              className="text-indigo-500 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Right - Lottie */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Lottie
            animationData={signUpLottie}
            loop
            className="w-60 h-60 md:w-72 md:h-72"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
