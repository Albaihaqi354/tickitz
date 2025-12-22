import { useState } from "react";
import CineOneLogo from "../assets/CineOne21.svg";
import EbvLogo from "../assets/ebv.svg";
import QrCode from "../assets/QR_Code.svg";

function OrderHistory() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false)

  return (
    <main>
      <section className="w-full">
        <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-[#AAAAAA]">
                Tuesday, 07 July 2020 - 04:30pm
              </p>
              <p className="text-3xl font-bold mt-5">Spider-Man: Homecoming</p>
            </div>
            <div>
              <img
                src={CineOneLogo}
                alt="CineOne Logo"
                className="w-32 md:w-36 lg:w-40 xl:w-45 h-auto"
              />
            </div>
          </div>

          <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>

          <div className="flex justify-between items-center mt-10">
            <div className="flex gap-5">
              <button className="text-xl font-semibold cursor-pointer text-[#00BA88] bg-[#00BA8833] rounded-xl p-3 pr-10 pl-10 hover:text-[#cff0e7] hover:bg-[#00BA88]">
                Ticket in active
              </button>
              <button className="text-xl font-semibold cursor-pointer text-[#E82C2C] bg-[#E82C2C33] rounded-xl p-3 pr-10 pl-10 hover:bg-[#E82C2C] hover:text-[#f3cfcf]">
                Not Paid
              </button>
            </div>
            <button
              onClick={() => setIsOpen1(!isOpen1)}
              className="text-[#AAAAAA] text-xl flex items-center gap-2 cursor-pointer"
            >
              Show Details
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className={`mt-8 ${isOpen1 ? "block" : "hidden"}`}>
            <h3 className="text-xl font-bold mb-6">Ticket Information</h3>

            <div className="flex justify-between items-center mb-6">
              <p className="text-[#AAAAAA] text-base">No. Rekening Virtual</p>
              <div className="flex items-center gap-3">
                <p className="text-xl font-semibold">12321328913829724</p>
                <button className="px-4 py-2 border-2 border-[#1D4ED8] text-[#1D4ED8] rounded-lg hover:bg-blue-50 transition-colors text-base">
                  Copy
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <p className="text-[#AAAAAA] text-base">Total Payment</p>
              <p className="text-3xl font-bold text-[#1D4ED8]">$30</p>
            </div>

            <div className="mb-6">
              <p className="text-base text-gray-600">
                Pay this payment bill before it is due, on{" "}
                <span className="font-semibold text-[#E82C2C]">
                  June 23, 2023
                </span>
                . If the bill has not been paid by the specified time, it will
                be forfeited
              </p>
            </div>

            <button className="bg-[#1D4ED8] text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-base">
              Cek Pembayaran
            </button>
          </div>
        </section>

        <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-[#AAAAAA]">
                Monday, 14 June 2020 - 02:00pm
              </p>
              <p className="text-3xl font-bold mt-5">Avengers: End Game</p>
            </div>
            <div>
              <img
                src={EbvLogo}
                alt="EBV Logo"
                className="w-20 md:w-32 lg:w-35 h-auto"
              />
            </div>
          </div>

          <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>

          <div className="flex justify-between items-center mt-10">
            <div className="flex gap-5">
              <button className="text-xl font-semibold cursor-pointer text-[#6E7191] bg-[#6E719133] rounded-xl p-3 pr-10 pl-10 hover:bg-[#6E7191] hover:text-[#dbdbde]">
                Ticket used
              </button>
              <button className="text-xl cursor-pointer font-semibold text-[#1D4ED8] bg-[#1D4ED833] rounded-xl p-3 pr-10 pl-10 hover:bg-[#1D4ED8] hover:text-[#cbd6f6]">
                Paid
              </button>
            </div>
            <button
              onClick={() => setIsOpen3(!isOpen3)}
              className="text-[#AAAAAA] text-xl flex items-center gap-3 cursor-pointer"
            >
              Show Details
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className={`mt-8 ${isOpen3 ? "block" : "hidden"}`}>
            <h3 className="text-xl font-bold mb-6">Ticket Information</h3>

            <div className="flex gap-8 items-center mb-6">
              <img
                src={QrCode}
                alt="Ticket QR Code"
                className="w-48 h-48 object-contain mt-4"
              />

              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div>
                    <p className="text-[#AAAAAA]">Category</p>
                    <p>PG-13</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Time</p>
                    <p>2:00pm</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Seats</p>
                    <p>C4, C5, C6</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div>
                    <p className="text-[#AAAAAA]">Movie</p>
                    <p>Spider-Man</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Date</p>
                    <p>07 Jul</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Count</p>
                    <p>3 pcs</p>
                  </div>
                </div>
              </div>

              <div>
                <p>Total</p>
                <p className="text-3xl font-semibold">$30.00</p>
              </div>
            </div>
          </div>
        </section>
       
        <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-[#AAAAAA]">
                Monday, 14 June 2020 - 02:00pm
              </p>
              <p className="text-3xl font-bold mt-5">Avengers: End Game</p>
            </div>
            <div>
              <img
                src={EbvLogo}
                alt="EBV Logo"
                className="w-20 md:w-32 lg:w-35 h-auto"
              />
            </div>
          </div>

          <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>

          <div className="flex justify-between items-center mt-10">
            <div className="flex gap-5">
              <button className="text-xl font-semibold cursor-pointer text-[#6E7191] bg-[#6E719133] rounded-xl p-3 pr-10 pl-10 hover:bg-[#6E7191] hover:text-[#dbdbde]">
                Ticket used
              </button>
              <button className="text-xl cursor-pointer font-semibold text-[#1D4ED8] bg-[#1D4ED833] rounded-xl p-3 pr-10 pl-10 hover:bg-[#1D4ED8] hover:text-[#cbd6f6]">
                Paid
              </button>
            </div>
            <button
              onClick={() => setIsOpen2(!isOpen2)}
              className="text-[#AAAAAA] text-xl flex items-center gap-3 cursor-pointer"
            >
              Show Details
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>

          <div className={`mt-8 ${isOpen2 ? "block" : "hidden"}`}>
            <h3 className="text-xl font-bold mb-6">Ticket Information</h3>

            <div className="flex gap-8 items-center mb-6">
              <img
                src={QrCode}
                alt="Ticket QR Code"
                className="w-48 h-48 object-contain mt-4"
              />

              <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                  <div>
                    <p className="text-[#AAAAAA]">Category</p>
                    <p>PG-13</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Time</p>
                    <p>2:00pm</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Seats</p>
                    <p>C4, C5, C6</p>
                  </div>
                </div>
                
                <div className="flex gap-5">
                  <div>
                    <p className="text-[#AAAAAA]">Movie</p>
                    <p>Spider-Man</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Date</p>
                    <p>07 Jul</p>
                  </div>
                  <div>
                    <p className="text-[#AAAAAA]">Count</p>
                    <p>3 pcs</p>
                  </div>
                </div>
              </div>

              <div>
                <p>Total</p>
                <p className="text-3xl font-semibold">$30.00</p>
              </div>
            </div>
          </div>
        </section>

      </section>
    </main>
  );
}

export default OrderHistory;
