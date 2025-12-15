import React from 'react';

function FooterTop() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Mulish', sans-serif;
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

        input {
          background: transparent;
        }
      `}</style>

      <div className="relative flex justify-center mt-10 px-5 sm:px-10">
        <div className="bg-[#2563EB] w-full h-130 sm:h-100 max-w-7xl rounded-lg relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-55 h-45 border-7 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 sm:border-6 md:border-8 border-white rounded-full translate-x-1/2 translate-y-1/2"></div>

          <div className="text-center mb-11 mt-18 sm:mt-12 md:mt-16 lg:mt-20 px-5 sm:px-10">
            <p className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-amber-50 leading-tight">
              Subscribe to our newsletter
            </p>
          </div>

          <form className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-5 mt-8 sm:mt-10 md:mt-12 lg:mt-15 mb-12 sm:mb-16 md:mb-20 lg:mb-25 px-5 sm:px-10">
            <input
              type="text"
              placeholder="First Name"
              className="w-70 h-15 sm:w-auto text-white text-base sm:text-lg md:text-xl border-2 border-white rounded-lg p-3 md:p-4 focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-70 h-15 sm:w-auto text-white text-base sm:text-lg md:text-xl border-2 border-white rounded-lg p-3 md:p-4 focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition"
            />
            <button className="w-70 h-15 sm:w-auto cursor-pointer bg-white text-[#2563EB] font-bold text-xl sm:text-lg md:text-xl border-2 border-white rounded-lg p-3 md:p-4 px-6 md:px-8  hover:bg-[#2563EB] hover:text-white transition whitespace-nowrap">
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FooterTop;