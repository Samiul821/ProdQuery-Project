import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import signInLottie from "../../public/SignIn.json";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { ThemeContext } from "../Provider/ThemeContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn, passwordReset } = useContext(AuthContext);
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        Swal.fire({
          title: "Sign In Successful!",
          text: "Your account has been logged in.",
          icon: "success",
          confirmButtonColor: "#14b8a6",
          confirmButtonText: "Okay",
        });
        navigate(`${location.state ? location.state : "/"}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Invalid email or password");
      });
  };

  const handlePasswordReset = () => {
    const email = prompt("Please enter your email address:");
    if (email) {
      passwordReset(email)
        .then(() => {
          toast.success("Password reset email sent");
        })
        .catch(() => {
          toast.error("Error sending password reset email");
        });
    } else {
      toast.error("Email address is required");
    }
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
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
      }`}
    >
      <Helmet>
        <title>Sign In | ProdQuery</title>
      </Helmet>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full max-w-4xl rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 flex flex-col-reverse md:flex-row gap-8 items-center relative overflow-hidden transition-colors duration-300 ${
          isDark
            ? "bg-gray-800 text-gray-200 border border-gray-600"
            : "bg-white backdrop-blur-md bg-opacity-70"
        }`}
      >
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2">
          <h2
            className={`text-3xl sm:text-4xl font-bold mb-6 text-center md:text-left font-poppins ${
              isDark ? "text-white" : "text-gray-800"
            }`}
          >
            Welcome Back
          </h2>

          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className={`block mb-1 text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-xl border text-sm placeholder-gray-400 transition focus:outline-none focus:ring-4 ${
                  isDark
                    ? "bg-gray-900 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-400 focus:border-indigo-400"
                }`}
              />
            </div>

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
                name="password"
                required
                placeholder="••••••••"
                className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm placeholder-gray-400 transition focus:outline-none focus:ring-4 ${
                  isDark
                    ? "bg-gray-900 border-gray-600 text-white focus:ring-indigo-500 focus:border-indigo-500"
                    : "bg-white border-gray-300 text-gray-900 focus:ring-indigo-400 focus:border-indigo-400"
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

            <div
              className={`flex items-center justify-between text-sm ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="accent-indigo-600 w-5 h-5 rounded-md"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="text-indigo-500 hover:underline focus:outline-none"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              Sign In
            </motion.button>
          </form>

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
              Sign in with Google
            </motion.button>
          </div>

          <p
            className={`text-center mt-6 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Don&apos;t have an account?{" "}
            <Link
              to="/auth/signUp"
              className="text-indigo-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Right Side - Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <Lottie
            animationData={signInLottie}
            loop
            className="w-60 h-60 md:w-72 md:h-72"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
