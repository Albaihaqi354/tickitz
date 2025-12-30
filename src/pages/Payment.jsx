import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import ModalPayment from "../components/ModalPayment";
import ButtonScrollToTop from "../components/ButtonScrolToTop";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const orderData = location.state;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!orderData) {
      navigate('/');
    }
  }, [orderData, navigate]);

  const handlePayment = () => {
    if (!fullName || !email || !phoneNumber || !selectedPaymentMethod) {
      return;
    }

    const newPaymentData = {
      ...orderData,
      userInfo: { fullName, email, phoneNumber },
      paymentMethod: selectedPaymentMethod,
    };
    
    setPaymentData(newPaymentData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePayLater = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          <section className="pt-10">
            <div className="hidden md:flex justify-center items-center gap-5 text-center mb-10">
              <div className="flex flex-col items-center">
                <p className="w-12 h-12 flex items-center justify-center bg-green-700 text-white rounded-full">
                  1
                </p>
                <p className="text-sm mt-1">Dates And Time</p>
              </div>

              <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>

              <div className="flex flex-col items-center">
                <p className="w-12 h-12 flex items-center justify-center bg-green-700 text-white rounded-full">
                  2
                </p>
                <p className="text-sm mt-1">Seat</p>
              </div>

              <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>

              <div className="flex flex-col items-center">
                <p className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-full">
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
                    {orderData.showDate} at {orderData.showTime}
                  </p>
                </div>
                <div className="border-t-2 border-[#E6E6E6] w-full"></div>

                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Movie Title
                  </label>
                  <p className="text-base font-semibold text-gray-700 mt-1">
                    {orderData.movie.title}
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
                  <p className="text-base font-semibold text-gray-700 mt-1">
                    {orderData.selectedSeats.length} pieces
                  </p>
                </div>
                <div className="border-t-2 border-[#E6E6E6] w-full"></div>

                <div>
                  <label className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Total Payment
                  </label>
                  <p className="text-xl font-bold text-[#1D4ED8] mt-1">
                    ${orderData.totalPrice.toFixed(2)}
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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                      value="+62"
                      readOnly
                      className="w-20 px-3 py-3 border border-gray-200 rounded-md text-base text-center bg-gray-100"
                    />
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                {[
                  { name: 'Google Pay', logo: GooglePay },
                  { name: 'Visa', logo: Visa },
                  { name: 'GoPay', logo: GoPay },
                  { name: 'Paypal', logo: Paypal },
                  { name: 'Dana', logo: Dana },
                  { name: 'BCA', logo: Bca },
                  { name: 'BRI', logo: Bri },
                  { name: 'OVO', logo: Ovo },
                ].map((method) => (
                  <button
                    key={method.name}
                    onClick={() => setSelectedPaymentMethod(method.name)}
                    className={`border rounded-lg h-20 p-4 transition-colors ${
                      selectedPaymentMethod === method.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-500 cursor-pointer'
                    }`}
                  >
                    <img src={method.logo} alt={method.name} className="mx-auto" />
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handlePayment}
              className="w-full bg-[#1D4ED8] text-white cursor-pointer text-lg font-semibold py-4 rounded-md hover:bg-[#1a45b8] transition"
            >
              Pay your order
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ModalPayment 
          paymentData={paymentData}
          onClose={handleCloseModal}
          onPayLater={handlePayLater}
          movieId={id} 
        />
      )}

      <ButtonScrollToTop/>
      <Footer />
    </>
  );
}

export default Payment;