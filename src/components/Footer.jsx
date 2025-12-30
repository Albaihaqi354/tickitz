import React from 'react';

// Import Assets
import TickitzLogo from '../assets/Tickitz2.svg';
import EbvLogo from '../assets/ebv.svg';
import CineOneLogo from '../assets/CineOne21.svg';
import HiflixLogo from '../assets/hiflix.svg';

import FacebookIcon from '../assets/eva_facebook.svg';
import InstagramIcon from '../assets/instagram.svg';
import TwitterIcon from '../assets/eva_twitter.svg';
import YoutubeIcon from '../assets/youtube.svg';

function Footer() {
  return (
    <>
      <footer className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-12 md:pb-16 lg:pb-18 mt-20 md:mt-25 lg:mt-30 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24'>
        <div className='sm:col-span-2 lg:col-span-1'>
          <img src={TickitzLogo} alt="Logo Tickitz" className="w-32 md:w-36 lg:w-40 xl:w-44 mb-4 md:mb-5" />
          <p className='text-base md:text-[18px] text-[#6E7191] leading-relaxed'>
            Stop waiting in line. Buy tickets conveniently, watch movies quietly.
          </p>
        </div>

        <div className='text-base md:text-[18px]'>
          <p className='font-bold mb-4 md:mb-5 text-gray-900'>Explore</p>
          <ul className='text-[#4E4B66] flex flex-row flex-wrap gap-4 md:flex-col md:gap-3'>
            <li><a href="#" className='hover:text-[#1D4ED8] transition'>Cinemas</a></li>
            <li><a href="#" className='hover:text-[#1D4ED8] transition'>Movies List</a></li>
            <li><a href="#" className='hover:text-[#1D4ED8] transition'>My Ticket</a></li>
            <li><a href="#" className='hover:text-[#1D4ED8] transition'>Notification</a></li>
          </ul>
        </div>

        <div>
          <p className='text-base md:text-[18px] font-bold mb-4 md:mb-5 text-gray-900'>Our Sponsor</p>
          <div className='flex flex-row lg:flex-col gap-6 md:gap-8 flex-wrap md:flexl-col'>
            <img src={EbvLogo} alt="EBV Logo" className="w-20 md:w-32 lg:w-36 h-auto" />
            <img src={CineOneLogo} alt="CineOne Logo" className="w-32 md:w-36 lg:w-40 xl:w-44 h-auto" />
            <img src={HiflixLogo} alt="Hiflix Logo" className="w-20 md:w-24 lg:w-28 h-auto" />
          </div>
        </div>

        <div>
          <p className='text-base md:text-[18px] font-bold mb-4 md:mb-5 text-gray-900'>Follow us</p>
          <div className='flex sm:flex-col gap-4 md:gap-5 text-[#4E4B66]'>

            <a href="#" className='flex items-center gap-2 md:gap-3 hover:text-[#1D4ED8] transition group'>
              <img src={FacebookIcon} alt="Facebook" className="w-5 md:w-6 lg:w-7 group-hover:scale-110 transition" />
              <p className='hidden sm:flex text-sm md:text-base'>Tickitz Cinema id</p>
            </a>

            <a href="#" className='flex items-center gap-2 md:gap-3 hover:text-[#1D4ED8] transition group'>
              <img src={InstagramIcon} alt="Instagram" className="w-5 md:w-6 lg:w-7 group-hover:scale-110 transition" />
              <p className='hidden sm:flex text-sm md:text-base'>tickitz.id</p>
            </a>

            <a href="#" className='flex items-center gap-2 md:gap-3 hover:text-[#1D4ED8] transition group'>
              <img src={TwitterIcon} alt="Twitter" className="w-5 md:w-6 lg:w-7 group-hover:scale-110 transition" />
              <p className='hidden sm:flex text-sm md:text-base'>tickitz.id</p>
            </a>

            <a href="#" className='flex items-center gap-2 md:gap-3 hover:text-[#1D4ED8] transition group'>
              <img src={YoutubeIcon} alt="YouTube" className="w-5 md:w-6 lg:w-7 group-hover:scale-110 transition" />
              <p className='hidden sm:flex text-sm md:text-base'>Tickitz Cinema id</p>
            </a>

          </div>
        </div>
      </footer>

      <div className='pb-10 md:pb-12 lg:pb-15 text-center text-sm md:text-base lg:text-[18px] text-[#4E4B66] px-5'>
        © 2020 Tickitz. All Rights Reserved.
      </div>
    </>
  );
}

export default Footer;