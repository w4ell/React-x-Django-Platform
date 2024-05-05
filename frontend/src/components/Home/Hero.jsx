import { Link } from "react-router-dom";

import illustrationIntro from "../../assets/images/illustration-intro.svg";

const Hero = () => {
  return (
    <section id="hero">
      {/* Flex Container */}
      <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-row">
        {/* Left Item */}
        <div className="flex flex-col mb-32 space-y-12 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-5xl md:text-left">
           Welcome to Infinite Analysis ! 
          </h1>
          <p className="max-w-sm text-center text-darkGrayishBlue md:text-left">
          Explore your personal data in a personalized way and discover new insights by forecasting data related to your whole.          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/register"
              className="p-3 px-6 pt-2 text-white bg-[#F25E3D] rounded-full baseline hover:bg-[#f07c62]"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* Image */}
        <div className="md:w-1/2">
          <img src={illustrationIntro} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
