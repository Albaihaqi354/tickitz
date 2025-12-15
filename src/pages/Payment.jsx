import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GooglePay from "../assets/logos_google_pay.svg";
import Visa from "../assets/logos_visa.svg";
import GoPay from "../assets/Logo_gopay.svg";
import Paypal from "../assets/logos_paypal.svg";
import Dana from "../assets/Logo_DANA.svg";
import Bca from "../assets/Bank_BCA_Logo.svg";
import Bri from "../assets/Bank_BRI_Logo.svg";
import Ovo from "../assets/OVO.svg";

function Payment() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <section className='pt-10'>
          <div className="hidden md:flex justify-center items-center gap-5 text-center mb-10">
            <div className="flex flex-col items-center">
              <p className="w-12 h-12 flex items-center justify-center bg-green-700 text-white rounded-full">
                1
              </p>
              <p className="text-sm mt-1">Dates And Time</p>
            </div>
            
            <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>
            
            <div className="flex flex-col items-center">
              <p className="w-12 h-12 flex items-center justify-center bg-gray-400 text-white rounded-full">
                2
              </p>
              <p className="text-sm mt-1">Seat</p>
            </div>
            
            <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>
            
            <div className="flex flex-col items-center">
              <p className="w-12 h-12 flex items-center justify-center bg-gray-400 text-white rounded-full">
                3
              </p>
              <p className="text-sm mt-1">Payment</p>
            </div>
          </div>
        </section>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">Payment Info</h2>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Date & Time
                  </label>
                  <p className="text-base font-semibold text-gray-700 mt-1">
                    Tuesday, 07 July 2020 at 02:00pm
                  </p>
                </div>
                <div className="border-t-2 border-[#E6E6E6] w-full"></div>

                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Movie Title
                  </label>
                  <p className="text-base font-semibold text-gray-700 mt-1">
                    Spider-Man: Homecoming
                  </p>
                </div>
                <div className="border-t-2 border-[#E6E6E6] w-full"></div>

                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Cinema Name
                  </label>
                  <p className="text-base font-semibold text-gray-700 mt-1">
                    CineOne21 Cinema
                  </p>
                </div>
                <div className="border-t-2 border-[#E6E6E6] w-full"></div>

                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Number of Tickets
                  </label>
                  <p className="text-base font-semibold text-gray-700 mt-1">3 pieces</p>
                </div>
                <div className="border-t-2 border-[#E6E6E6] w-full"></div>

                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Total Payment
                  </label>
                  <p className="text-xl font-bold text-[#1D4ED8] mt-1">
                    $30.00
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6">
                Personal Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-[18px] text-gray-500 mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[18px] text-gray-500 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[18px] text-gray-500 mb-2 block">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="w-20 px-3 py-3 border border-gray-200 rounded-md text-base text-center
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+62"
                    />
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-md text-base
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Payment Method</h2>

              <div className="grid grid-cols-4 gap-4">
                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img
                    src={GooglePay}
                    alt="Google Pay"
                    className="w-28 mx-auto"
                  />
                </button>

                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img src={Visa} alt="Visa" className="w-28 mx-auto" />
                </button>

                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img src={GoPay} alt="GoPay" className="w-28 mx-auto" />
                </button>

                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img src={Paypal} alt="Paypal" className="w-20 mx-auto" />
                </button>

                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img src={Dana} alt="Dana" className="w-28 mx-auto" />
                </button>

                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img src={Bca} alt="BCA" className="w-28 mx-auto" />
                </button>

                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img src={Bri} alt="BRI" className="w-28 mx-auto" />
                </button>

                <button className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors">
                  <img src={Ovo} alt="OVO" className="w-28 mx-auto" />
                </button>
              </div>
            </div>

            <button className="w-full bg-[#1D4ED8]  text-white text-lg font-semibold py-4 rounded-md">
              Pay your order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
