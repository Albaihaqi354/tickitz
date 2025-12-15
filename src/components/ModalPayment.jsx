import React from "react";

function ModalPayment() {
  return (
    <>
      <main>
        <div className="absolute flex w-screen h-screen inset-0 items-center justify-center after:absolute after:inset-0 after:z-10 after:bg-black/50">
          <div className="bg-white w-130 h-130 flex flex-col rounded-lg z-20">
            <div className="p-5">
              <p className="text-2xl font-semibold text-center">Payment Info</p>
              <div className="flex justify-between items-center mt-10">
                <p className="text-[#8692A6]">No. Rekening Virtual</p>
                <div className="flex gap-5 items-center">
                  <p className="font-bold">12321328913829724</p>
                  <button className="border border-solid border-[#1D4ED8] text-[#1D4ED8] p-2 pl-3 pr-3 rounded-lg">
                    Copy
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mt-10">
                <p className="text-[#8692A6]">Total Payment</p>
                <p className="text-[#1D4ED8] text-xl font-bold">$30</p>
              </div>
              <div className="mt-10">
                <p className="text-[#8692A6]">Pay this payment bill before it is due, on June 23, 2023. If the bill has not been paid by the specified time, it will be forfeited</p>
              </div>
            </div>
            
            <button className="bg-[#1D4ED8] font-bold rounded-lg text-white p-4 mt-5 ml-5 mr-5">Check Payment</button>
            <button className="font-bold rounded-lg text-[#1D4ED8] p-3 m-5">Pay Later</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default ModalPayment;
