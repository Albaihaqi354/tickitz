import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../redux/slices/order.slice";

function ModalPayment({ paymentData, onClose, onPayLater, movieId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  const { loading } = useSelector(state => state.order);
  
  const handleCheckPayment = async () => {
    if (!paymentData || !token) return;

    try {
      const resultAction = await dispatch(createOrder({
        scheduleId: paymentData.schedule.id,
        seats: paymentData.selectedSeats,
        paymentMethod: paymentData.paymentMethod,
        token
      }));

      if (createOrder.fulfilled.match(resultAction)) {
        navigate(`/movies/${movieId}/order/payment/ticket-result`, {
          state: { 
            ...paymentData, 
            result: resultAction.payload
          }
        });
      } else {
        alert("Failed to create order: " + (resultAction.payload || "Unknown error"));
      }
    } catch (error) {
      alert("An unexpected error occurred: " + error.message);
    }
  };
  
  return (
    <>
      <main>
        <div className="fixed flex w-screen h-screen inset-0 items-center justify-center z-100">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          ></div>
          <div className="bg-white w-full max-w-md rounded-2xl z-20 p-8 relative shadow-2xl mx-4">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <p className="text-xl font-bold text-gray-800 text-center mb-8">Payment Info</p>
            
            <div className="space-y-6 mb-10">
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">No. Rekening Virtual</p>
                  <p className="font-black text-gray-700 text-lg tracking-wider">12321328913829724</p>
                </div>
                <button 
                  className="bg-white border border-blue-100 text-sm font-bold text-[#1D4ED8] px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
                  onClick={() => {
                    navigator.clipboard.writeText("12321328913829724");
                    alert("Copied to clipboard!");
                  }}
                >
                  Copy
                </button>
              </div>
              
              <div className="flex justify-between items-center px-2">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Payment</p>
                <p className="text-[#1D4ED8] text-2xl font-black">
                  Rp{paymentData ? paymentData.totalPrice.toLocaleString('id-ID') : '0'}
                </p>
              </div>
            </div>
            
            <div className="mb-10 bg-blue-50/50 border border-blue-100/50 p-4 rounded-xl">
              <p className="text-gray-500 text-sm leading-relaxed text-center">
                Pay this payment bill before it is due, on <span className="font-bold text-gray-700">June 23, 2023</span>. If the bill has not been paid by the specified time, it will be forfeited.
              </p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleCheckPayment}
                disabled={loading}
                className={`w-full bg-[#1D4ED8] font-bold rounded-xl text-white py-4 shadow-lg shadow-blue-100 hover:shadow-blue-200 transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processing...
                  </div>
                ) : 'Check Payment'}
              </button>
              
              <button 
                onClick={onPayLater}
                disabled={loading}
                className="w-full font-bold text-[#1D4ED8] py-2 hover:text-blue-700 transition-colors cursor-pointer text-sm"
              >
                Pay Later
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ModalPayment;
