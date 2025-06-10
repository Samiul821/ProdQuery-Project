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

      <main className="flex-grow ">
        <Outlet />
      </main>

      <footer className="px-[4%] lg:px-[10%]">
        <Footer />
      </footer>
    </div>
  );
};

export default AuthLaout;
