import React from "react";
import {
  Navbar,
  Footer,
  CallToAction,
  Features,
  Testimonial,
  Hero,
} from "../components/Home";
const Home = () => {
  return (
    <div className="body">
      <Navbar />
      <Hero />
      <Features />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
