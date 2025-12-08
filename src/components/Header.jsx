import React, { useState } from 'react';
import TickitzLogo from '../assets/Tickitz2.svg';
import { Link } from 'react-router';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Mulish', sans-serif;
        }
      `}</style>

      <header className='pt-6 pb-3 px-5 sm:px-10 md:px-20 lg:px-30'>
        <div className='flex justify-between items-center'>
          <img src={TickitzLogo} alt="Logo Tickitz" className="w-28 sm:w-32 md:w-35 lg:w-45 z-50" />

          <ul className='hidden lg:flex gap-10 xl:gap-15 text-[18px] lg:text-[20px]'>
            <li><Link to={"/"} className='hover:text-[#1D4ED8] transition'>Home</Link></li>
            <li><Link to={"/movies"} className='hover:text-[#1D4ED8] transition'>Movie</Link></li>
            <li><Link to={""} className='hover:text-[#1D4ED8] transition'>Buy Ticket</Link></li>
          </ul>

          <div className='hidden lg:flex gap-4 xl:gap-5'>
            <p className='text-[#1D4ED8] text-[16px] lg:text-[18px] border-2 border-solid border-[#1D4ED8] rounded-[5px] py-2 px-4 lg:px-6 hover:bg-[#1D4ED8] hover:text-[#F8FAFC] cursor-pointer transition'>
              <Link to={"auth/signIn"}>SigIn</Link>
            </p>
            <p className='bg-[#1D4ED8] text-[#F8FAFC] text-[16px] lg:text-[18px] border-2 border-solid border-[#1D4ED8] rounded-[5px] py-2 px-4 lg:px-6 hover:text-[#1D4ED8] hover:bg-[#F8FAFC] cursor-pointer transition'>
              <Link to={"auth/signUp"}>SigUp</Link>
            </p>
          </div>

          <button 
            onClick={toggleMenu}
            className='lg:hidden flex flex-col gap-1.5 z-50 w-8 h-8 justify-center items-center'
            aria-label="Toggle menu"
          >
            <span className={`w-7 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-7 h-0.5 bg-gray-800 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        <div className={`lg:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className='flex flex-col items-center justify-center h-full gap-8'>
            <ul className='flex flex-col items-center gap-8 text-2xl'>
              <li><Link to={"/"} className='hover:text-[#1D4ED8] transition'>Home</Link></li>
              <li><Link to={"/movies"} className='hover:text-[#1D4ED8] transition'>Movie</Link></li>
              <li><Link to={"/"} className='hover:text-[#1D4ED8] transition'>Buy Ticket</Link></li>
            </ul>

            <div className='flex flex-col gap-4 w-64'>
              <p className='text-center text-[#1D4ED8] text-[18px] border-2 border-solid border-[#1D4ED8] rounded-[5px] py-3 px-6 hover:bg-[#1D4ED8] hover:text-[#F8FAFC] cursor-pointer transition'>
                <Link to={"/auth/signIn"}>SigIn</Link>
              </p>
              <p className='text-center bg-[#1D4ED8] text-[#F8FAFC] text-[18px] border-2 border-solid border-[#1D4ED8] rounded-[5px] py-3 px-6 hover:text-[#1D4ED8] hover:bg-[#F8FAFC] cursor-pointer transition'>
                <Link to={"/auth/signUp"}>SigUp</Link>
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center gap-3 text-gray-400 text-sm">
        <span className="flex-1 h-px bg-gray-300"></span>
      </div>
    </>
  );
}

export default Header;