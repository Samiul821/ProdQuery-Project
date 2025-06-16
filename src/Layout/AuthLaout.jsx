import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AuthLaout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <header>
        <Navbar />
      </header>

      <main className="flex-grow min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLaout;
