import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../assets/image1.svg";
import TickitzLogo from "../assets/Tickitz1.svg";
import QrCode from "../assets/QR_Code.svg";

function TicketResult() {
  return (
    <>
      <Header />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Mulish', sans-serif;
        }
      `}</style>

      <section className="flex h-fit bg-[#A0A3BD33]">
        <section className="relative">
          <img
            src={Background}
            alt="Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70 flex items-center px-6 lg:px-20">
            <div className="text-white max-w-xl">
              <img
                src={TickitzLogo}
                alt="Logo Tickitz"
                className="w-40 md:w-60"
              />

              <h1 className="text-4xl lg:text-5xl font-semibold mt-6">
                Thank you For Purchasing
              </h1>

              <p className="text-lg lg:text-2xl mt-5">
                Lorem ipsum dolor sit amet consectetur. Quam pretium pretium
                tempor integer sed magna et.
              </p>

              <p className="text-lg lg:text-xl font-bold mt-7">
                Please Download Your Ticket
              </p>
            </div>
          </div>
        </section>

        <section className="w-1/2 flex flex-col items-center justify-center">
          <div className="bg-white w-[360px] p-6 rounded-xl flex flex-col items-center">
            <img
              src={QrCode}
              alt="QR Code"
              className="w-48 h-48 object-contain"
            />
            
            <div className="border-t-2 border-dashed border-gray-400 w-full m-15"></div>

            <div className="mt-6 w-full text-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-[16px]">Movie</p>
                  <p className="font-semibold text-[18px]">Spider-Man: ..</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[16px]">Category</p>
                  <p className="font-semibold text-[18px]">PG-13</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-gray-400 text-[16px]">Date</p>
                  <p className="font-semibold text-[18px]">07 Jul</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[16px]">Time</p>
                  <p className="font-semibold text-[18px]">2:00 PM</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-gray-400 text-[16px]">Count</p>
                  <p className="font-semibold text-[18px]">3 pcs</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[16px]">Seat</p>
                  <p className="font-semibold text-[18px]">C4, C5, C6</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 border border-[#DEDEDE] p-4 rounded-lg">
                <p className="font-semibold text-[20px]">Total</p>
                <p className="font-bold text-lg">$30.00</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-[360px]">
            <button className="mt-7 border border-[#1D4ED8] rounded-lg text-[#1D4ED8] text-xl font-bold p-4">
              Download
            </button>
            <button className="mt-5 bg-[#1D4ED8] rounded-lg text-white text-xl font-bold p-4">
              Done
            </button>
          </div>
        </section>
      </section>

      <Footer />
    </>
  );
}

export default TicketResult;
