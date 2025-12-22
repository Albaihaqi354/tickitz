import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../assets/image1.svg";
import TickitzLogo from "../assets/tickitz1.svg";
import QrCode from "../assets/QR_Code.svg";
import ButtonScrollToTop from "../components/ButtonScrolToTop";

function TicketResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const ticketData = location.state;

  useEffect(() => {
    if (!ticketData) {
      navigate('/');
    }
  }, [ticketData, navigate]);

  const handlePrint = () => {
    window.print();
  };

  if (!ticketData) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-[#1D4ED8]">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      <Header />
      <section className="flex flex-col lg:flex-row min-h-screen bg-[#A0A3BD33]">
        <section className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-full no-print">
          <img
            src={Background}
            alt="Background"
            className="w-full h-180 sm:h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/70 flex items-center px-6 lg:px-20">
            <div className="text-white max-w-xl flex flex-col items-center sm:items-start">
              <img
                src={TickitzLogo}
                alt="Logo Tickitz"
                className="w-40 md:w-60"
              />

              <h1 className="text-4xl text-center sm:text-start lg:text-5xl font-semibold mt-6">
                Thank you For Purchasing
              </h1>

              <p className="text-lg lg:text-2xl text-center sm:text-start mt-5">
                Lorem ipsum dolor sit amet consectetur. Quam pretium pretium
                tempor integer sed magna et.
              </p>

              <p className="text-lg lg:text-xl font-bold mt-7">
                Please Download Your Ticket
              </p>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-1/2 flex flex-col items-center justify-center py-10 lg:py-0">
          <div className="bg-white w-full max-w-[360px] p-6 rounded-xl flex flex-col items-center mt-8">
            <img
              src={QrCode}
              alt="Ticket QR Code"
              className="w-48 h-48 object-contain mt-4"
            />
            
            <div className="border-t-2 border-dashed border-gray-400 w-full my-6"></div>

            <div className="w-full text-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-[16px]">Movie</p>
                  <p className="font-semibold text-[18px] truncate" title={ticketData.movie.title}>{ticketData.movie.title}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[16px]">Category</p>
                  <p className="font-semibold text-[18px]">
                    {ticketData.movie.genres && ticketData.movie.genres.length > 0
                      ? ticketData.movie.genres[0].name
                      : 'N/A'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-gray-400 text-[16px]">Date</p>
                  <p className="font-semibold text-[18px]">{formatDate(ticketData.showDate)}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[16px]">Time</p>
                  <p className="font-semibold text-[18px]">{ticketData.showTime}</p>
                </div>
              </div>

              <div className="flex justify-between mt-4">
                <div>
                  <p className="text-gray-400 text-[16px]">Count</p>
                  <p className="font-semibold text-[18px]">{ticketData.selectedSeats.length} pcs</p>
                </div>
                <div>
                  <p className="text-gray-400 text-[16px]">Seats</p>
                  <p className="font-semibold text-[18px]">{ticketData.selectedSeats.join(', ')}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 border border-[#DEDEDE] p-4 rounded-lg">
                <p className="font-semibold text-[20px]">Total</p>
                <p className="font-bold text-lg">${ticketData.totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-[360px] no-print mt-7 mb-10">
            <button 
              onClick={handlePrint}
              className="border border-[#1D4ED8] rounded-lg text-[#1D4ED8] text-xl font-bold p-4 hover:bg-gray-100 transition"
            >
              Download
            </button>
            <button 
              onClick={() => navigate('/')}
              className="mt-5 bg-[#1D4ED8] rounded-lg text-white text-xl font-bold p-4 hover:bg-[#1a45b8] transition"
            >
              Done
            </button>
          </div>
        </section>
      </section>
      
      <ButtonScrollToTop/>
      <Footer />
    </>
  );
}

export default TicketResult;