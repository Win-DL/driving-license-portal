import React from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Steps from "../components/Steps";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CTA />
      <Features />
      <Steps />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
