import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import { fetchProfile } from "../redux/slices/user.slice";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const orderData = location.state;

  const { token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchProfile(token));
    }
  }, [token, profile, dispatch]);

  useEffect(() => {
    if (profile) {
      setFullName(`${profile.first_name} ${profile.last_name || ""}`.trim());
      setEmail(profile.email || "");
      setPhoneNumber(profile.phone_number || "");
    }
  }, [profile]);

  const handlePayment = () => {
    if (!fullName || !email || !phoneNumber || !selectedPaymentMethod) {
      alert("Please fill in all information and select a payment method.");
      return;
    }

    const finalPaymentData = {
      ...orderData,
      userInfo: { fullName, email, phoneNumber },
      paymentMethod: selectedPaymentMethod,
    };

    setPaymentData(finalPaymentData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePayLater = () => {
    setShowModal(false);
  };

  if (!orderData) return null;

  const showDate = new Date(orderData.schedule.show_date).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  
  const showTime = new Date(orderData.schedule.show_time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-8">
            <section className="hidden md:block">
              <div className="flex justify-center items-center gap-5 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full font-bold shadow-md">✓</div>
                  <p className="text-[10px] mt-2 font-bold text-gray-400 uppercase tracking-widest">Date & Time</p>
                </div>
                <div className="border-t-2 border-dashed border-gray-300 w-12 mb-6"></div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full font-bold shadow-md">✓</div>
                  <p className="text-[10px] mt-2 font-bold text-gray-400 uppercase tracking-widest">Seat</p>
                </div>
                <div className="border-t-2 border-dashed border-gray-300 w-12 mb-6"></div>
                <div className="flex flex-col items-center">
                  <p className="w-10 h-10 flex items-center justify-center bg-[#1D4ED8] text-white rounded-full font-bold shadow-lg shadow-blue-200">3</p>
                  <p className="text-[10px] mt-2 font-bold text-[#1D4ED8] uppercase tracking-widest">Payment</p>
                </div>
              </div>
            </section>

            {/* Payment Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-50 pb-4">Payment Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest lg:text-left">Date & Time</p>
                  <p className="font-bold text-gray-700 text-lg lg:text-left">{showDate} at {showTime}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest lg:text-left">Movie Title</p>
                  <p className="font-bold text-gray-700 text-lg lg:text-left">{orderData.movie.title}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest lg:text-left">Cinema Name</p>
                  <p className="font-bold text-gray-700 text-lg lg:text-left">{orderData.schedule.cinema_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest lg:text-left">Number of Tickets</p>
                  <p className="font-bold text-gray-700 text-lg lg:text-left">{orderData.selectedSeats.length} pieces</p>
                </div>
              </div>
              <div className="mt-10 pt-6 border-t border-gray-50 flex justify-between items-center">
                 <p className="text-lg font-bold text-gray-800">Total Payment</p>
                 <p className="text-2xl font-black text-[#1D4ED8]">Rp{orderData.totalPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-50 pb-4">Personal Information</h2>
              <div className="space-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-bold">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-[350px] space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-800 mb-8 border-b border-gray-50 pb-4 text-center">Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "Google Pay", logo: GooglePay },
                  { name: "Visa", logo: Visa },
                  { name: "GoPay", logo: GoPay },
                  { name: "Paypal", logo: Paypal },
                  { name: "Dana", logo: Dana },
                  { name: "BCA", logo: Bca },
                  { name: "BRI", logo: Bri },
                  { name: "OVO", logo: Ovo },
                ].map((method) => (
                  <button
                    key={method.name}
                    onClick={() => setSelectedPaymentMethod(method.name)}
                    className={`group relative flex items-center justify-center border-2 rounded-xl h-16 transition-all duration-300 p-3 bg-white ${
                      selectedPaymentMethod === method.name
                        ? "border-[#1D4ED8] ring-4 ring-blue-50"
                        : "border-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <img src={method.logo} alt={method.name} className="max-h-full object-contain" />
                    {selectedPaymentMethod === method.name && (
                      <div className="absolute -top-2 -right-2 bg-[#1D4ED8] text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold shadow-lg">✓</div>
                    )}
                  </button>
                ))}
              </div>
              
              <div className="mt-12 space-y-4">
                  <button
                    onClick={handlePayment}
                    className={`w-full py-4 rounded-xl text-lg font-bold transition-all shadow-lg ${
                      !selectedPaymentMethod
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#1D4ED8] text-white hover:bg-[#1a45b8] shadow-blue-100 hover:shadow-blue-200"
                    }`}
                    disabled={!selectedPaymentMethod}
                  >
                    Pay your order
                  </button>
                  <button 
                    onClick={() => navigate(-1)}
                    className="w-full py-2 text-gray-400 font-bold hover:text-gray-600 transition-colors text-sm"
                  >
                    Previous Step
                  </button>
              </div>
            </div>
          </aside>
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

      <ButtonScrollToTop />
      <Footer />
    </>
  );
}

export default Payment;
