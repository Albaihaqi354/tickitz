import React, { useState } from 'react';
import ModalFooter from './ModalFooter.jsx';

function FooterTop() {
  const [formData, setFormData] = useState({
    firstName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nama depan harus diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      setModalMessage('Terima kasih sudah berlanganan');
      setIsSuccess(true);
      setShowModal(true);
      
      setFormData({
        firstName: '',
        email: ''
      });
      setErrors({});
    } else {
      setErrors(formErrors);
      const firstError = Object.values(formErrors)[0];
      setModalMessage(firstError);
      setIsSuccess(false);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="relative flex justify-center mt-10 px-5 sm:px-10">
        <div className="bg-[#2563EB] w-full h-130 sm:h-100 max-w-7xl rounded-lg relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-55 h-45 border-7 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-60 lg:h-60 sm:border-6 md:border-8 border-white rounded-full translate-x-1/2 translate-y-1/2"></div>

          <div className="text-center mb-11 mt-18 sm:mt-12 md:mt-16 lg:mt-20 px-5 sm:px-10">
            <p className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-amber-50 leading-tight">
              Subscribe to our newsletter
            </p>
          </div>

          <form className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-5 mt-8 sm:mt-10 md:mt-12 lg:mt-15 mb-12 sm:mb-16 md:mb-20 lg:mb-25 px-5 sm:px-10" onSubmit={handleSubmit}>
            <div className="relative w-70 sm:w-auto">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full h-15 bg-transparent text-white placeholder:text-placeholder text-base sm:text-lg md:text-xl border-2 ${errors.firstName ? 'border-red-400' : 'border-white'} rounded-lg p-3 md:p-4 focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition`}
              />
              {errors.firstName && (
                <span className="absolute -bottom-5 left-0 text-red-300 text-xs">
                  {errors.firstName}
                </span>
              )}
            </div>
            
            <div className="relative w-70 sm:w-auto">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full h-15 bg-transparent placeholder:text-placeholder text-white text-base sm:text-lg md:text-xl border-2 ${errors.email ? 'border-red-400' : 'border-white'} rounded-lg p-3 md:p-4 focus:outline-none focus:border-white focus:ring-2 focus:ring-white transition`}
              />
              {errors.email && (
                <span className="absolute -bottom-5 left-0 text-red-300 text-xs">
                  {errors.email}
                </span>
              )}
            </div>
            
            <button 
              type="submit"
              className="w-70 h-15 sm:w-auto cursor-pointer bg-white text-[#2563EB] font-bold text-xl sm:text-lg md:text-xl border-2 border-white rounded-lg p-3 md:p-4 px-6 md:px-8 hover:bg-[#2563EB] hover:text-white transition whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <ModalFooter 
          message={modalMessage} 
          onClose={closeModal} 
          isSuccess={isSuccess}
        />
      )}
    </>
  );
}

export default FooterTop;