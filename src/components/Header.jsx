import React, { useState } from "react";
import TickitzLogo from "../assets/Tickitz2.svg";
import { Link } from "react-router";
import { useSelector } from "react-redux";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const firstLetter = user?.email?.charAt(0).toUpperCase() || "";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = !!user;

  return (
    <header className="pt-6 pb-3 px-5 sm:px-10 md:px-20 lg:px-30">
      <div className="flex justify-between items-center">
        <img src={TickitzLogo} className="w-28 sm:w-32 md:w-35 lg:w-45 z-50" />

        <ul className="hidden lg:flex gap-10 xl:gap-15 text-[18px] lg:text-[20px]">
          <li><Link to="/" className="hover:text-[#1D4ED8]">Home</Link></li>
          <li><Link to="/movies" className="hover:text-[#1D4ED8]">Movie</Link></li>
          <li><Link to="/movies/payment" className="hover:text-[#1D4ED8]">Buy Ticket</Link></li>
        </ul>

        {isLoggedIn ? (
          <div className="hidden lg:flex items-center gap-3">
            {!user?.profile_photo ? (
              <div className="w-15 h-15 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-lg font-bold border">
                {firstLetter}
              </div>
            ) : (
              <img
                src={user.profile_photo}
                alt={user.email}
                className="w-10 h-10 rounded-full object-cover border"
              />
            )}
          </div>
        ) : (
          <div className="hidden lg:flex gap-4">
            <p className="text-[#1D4ED8] border-2 border-[#1D4ED8] rounded-[5px] py-2 px-4">
              <Link to="/auth/signIn">Sign In</Link>
            </p>
            <p className="bg-[#1D4ED8] text-white border-2 border-[#1D4ED8] rounded-[5px] py-2 px-4">
              <Link to="/auth/signUp">Sign Up</Link>
            </p>
          </div>
        )}

        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col gap-1.5 z-50 w-8 h-8 justify-center items-center"
        >
          <span className={`w-7 h-0.5 bg-gray-800 transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-7 h-0.5 bg-gray-800 transition-all ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-7 h-0.5 bg-gray-800 transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <ul className="flex flex-col items-center gap-8 text-2xl">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movie</Link></li>
            <li><Link to="/">Buy Ticket</Link></li>
          </ul>

          <div className="flex flex-col gap-4 w-64 items-center">
            {isLoggedIn ? (
              !user?.profile_photo ? (
                <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold border">
                  {firstLetter}
                </div>
              ) : (
                <img
                  src={user.profile_photo}
                  alt={user.email}
                  className="w-20 h-20 rounded-full object-cover border"
                />
              )
            ) : (
              <>
                <p className="text-[#1D4ED8] text-[18px] border-2 border-[#1D4ED8] rounded-[5px] py-3 px-6 text-center">
                  <Link to="/auth/signIn">Sign In</Link>
                </p>

                <p className="bg-[#1D4ED8] text-white text-[18px] border-2 border-[#1D4ED8] rounded-[5px] py-3 px-6 text-center">
                  <Link to="/auth/signUp">Sign Up</Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
