import React from "react";
import LandingPage from "../components/Home/LandingPage";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
};

export default Home;
