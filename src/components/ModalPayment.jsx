import React from "react";
import { useNavigate } from "react-router-dom";

function ModalPayment({ paymentData, onClose, onPayLater, movieId }) {
  const navigate = useNavigate();
  
  const handleCheckPayment = () => {
    navigate(`/movies/${movieId}/order/payment/ticket-result`, {
      state: paymentData
    });
  };
  
  return (
    <>
      <main>
        <div className="fixed flex w-screen h-screen inset-0 items-center justify-center z-50">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={onClose}
          ></div>
          <div className="bg-white w-150 rounded-lg z-20 p-6 relative">
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <p className="text-2xl font-semibold text-center mb-6">Payment Info</p>
            
            <div className="flex justify-between items-center mb-10">
              <p className="text-[#8692A6]">No. Rekening Virtual</p>
              <div className="flex gap-4 items-center">
                <p className="font-bold">12321328913829724</p>
                <button 
                  className="border text-xl border-solid border-[#1D4ED8] text-[#1D4ED8] p-2 rounded-lg"
                >
                  Copy
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-10">
              <p className="text-[#8692A6]">Total Payment</p>
              <p className="text-[#1D4ED8] text-xl font-bold">
                ${paymentData ? paymentData.totalPrice.toFixed(2) : '0.00'}
              </p>
            </div>
            
            <div className="mb-10">
              <p className="text-[#8692A6] text-lg">Pay this payment bill before it is due, on June 23, 2023. If the bill has not been paid by the specified time, it will be forfeited</p>
            </div>
            
            <button 
              onClick={handleCheckPayment}
              className="w-full bg-[#1D4ED8] font-bold rounded-lg text-white p-4 mb-5"
            >
              Check Payment
            </button>
            
            <button 
              onClick={onPayLater}
              className="w-full font-bold rounded-lg text-[#1D4ED8] p-4 mb-5"
            >
              Pay Later
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default ModalPayment;