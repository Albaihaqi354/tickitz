import React, { useState } from "react";
import TickitzLogo from "../assets/Tickitz2.svg";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/slices/auth.slice";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const firstLetter = user?.email?.charAt(0).toUpperCase() || "";
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        navigate("/auth/signIn");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const isLoggedIn = !!user;

  return (
    <header className="py-4 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="flex justify-between items-center">
        <Link to="/">
          <img src={TickitzLogo} className="w-28 sm:w-32 md:w-36 lg:w-40 xl:w-44 z-50" alt="Tickitz Logo" />
        </Link>

        <ul className="hidden lg:flex gap-8 xl:gap-12 text-base lg:text-lg">
          <li><Link to="/" className="hover:text-[#1D4ED8]">Home</Link></li>
          <li><Link to="/movies" className="hover:text-[#1D4ED8]">Movie</Link></li>
          <li><Link to="/movies/payment" className="hover:text-[#1D4ED8]">Buy Ticket</Link></li>
        </ul>

        {isLoggedIn ? (
          <div className="hidden lg:flex items-center gap-4">
            {!user?.profile_photo ? (
              <div className="w-10 h-10 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center text-lg font-bold border">
                {firstLetter}
              </div>
            ) : (
              <img
                src={user.profile_photo}
                alt={user.email}
                className="w-10 h-10 rounded-full object-cover border"
              />
            )}
            <button
              onClick={handleLogout}
              className="text-base font-medium text-white bg-red-600 py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex gap-4">
            <Link to="/auth/signIn" className="text-[#1D4ED8] border-2 border-[#1D4ED8] rounded-[5px] py-2 px-4 text-center">
              Sign In
            </Link>
            <Link to="/auth/signUp" className="bg-[#1D4ED8] text-white border-2 border-[#1D4ED8] rounded-[5px] py-2 px-4 text-center">
              Sign Up
            </Link>
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
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/movies" onClick={toggleMenu}>Movie</Link></li>
            <li><Link to="/movies/payment" onClick={toggleMenu}>Buy Ticket</Link></li>
          </ul>

          <div className="flex flex-col gap-4 w-64 items-center">
            {isLoggedIn ? (
              <>
                {!user?.profile_photo ? (
                  <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold border">
                    {firstLetter}
                  </div>
                ) : (
                  <img
                    src={user.profile_photo}
                    alt={user.email}
                    className="w-20 h-20 rounded-full object-cover border"
                  />
                )}
                <p className="text-gray-800 text-center">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="text-lg text-white cursor-pointer bg-red-600 rounded-[5px] py-3 px-6 text-center w-full hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/signIn" onClick={toggleMenu} className="text-[#1D4ED8] text-[18px] border-2 border-[#1D4ED8] rounded-[5px] py-3 px-6 text-center w-full">
                  Sign In
                </Link>

                <Link to="/auth/signUp" onClick={toggleMenu} className="bg-[#1D4ED8] text-white text-[18px] border-2 border-[#1D4ED8] rounded-[5px] py-3 px-6 text-center w-full">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;