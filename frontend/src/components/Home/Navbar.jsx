import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import companyLogo from "../../assets/images/logo.svg";
import { SiShopware } from "react-icons/si";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdminAuthenticated = useSelector(
    (state) => state.user.isAdminAuthenticated
  );
  return (
    <nav className="relative container mx-auto p-6">
      {/* Flex Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="pt-2">
          <Link
            to="/"
            className="items-center gap-3 flex text-xl font-extrabold tracking-tight text-[#F25E3D]"
          >
            <SiShopware size={30} /> <span>Data visualization</span>
          </Link>
        </div>
        {/* Menu Items */}
        <div className="hidden space-x-6 md:flex">
          <Link to="/" className="hover:text-gray-500">
            Home
          </Link>
          <Link to="#" className="hover:text-gray-500">
            Product
          </Link>
          <Link to="#" className="hover:text-gray-500">
            About Us
          </Link>
          <Link to="#" className="hover:text-gray-500">
            Careers
          </Link>
          <Link to="#" className="hover:text-gray-500">
            Community
          </Link>
        </div>
        {/* Button */}
        <Link
          to="/register"
          className="hidden p-3 px-6 pt-2 text-white bg-[#F25E3D] rounded-full baseline hover:bg-[#f07c62] md:block"
        >
          {isAuthenticated || isAdminAuthenticated
            ? "Dashboard"
            : "Get Started"}
        </Link>

        {/* Hamburger Icon */}
        <button
          className={
            toggleMenu
              ? "open block hamburger md:hidden focus:outline-none"
              : "block hamburger md:hidden focus:outline-none"
          }
          onClick={() => setToggleMenu(!toggleMenu)}
        >
          <span className="hamburger-top"></span>
          <span className="hamburger-middle"></span>
          <span className="hamburger-bottom"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <div
          className={
            toggleMenu
              ? "absolute flex flex-col items-center self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
              : "absolute flex-col items-center hidden self-end py-8 mt-10 space-y-6 font-bold bg-white sm:w-auto sm:self-center left-6 right-6 drop-shadow-md"
          }
        >
          <Link to="#">Pricing</Link>
          <Link to="#">Product</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Careers</Link>
          <Link to="#">Community</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
