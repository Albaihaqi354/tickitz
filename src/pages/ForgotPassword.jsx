import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TickitzLogo from '../assets/tickitz1.svg';
import Background from '../assets/image1.svg';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const validateEmail = (email) => {
    const re = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});
    setSuccessMessage('');

    if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }

    console.log('Sending password reset link to:', email);
    
    try {
      setSuccessMessage('OTP sent to your email');
      setEmail(''); 

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 w-full h-full z-0">
          <img src={Background} alt="Background" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <header className="pt-16 flex justify-center relative z-10">
          <img src={TickitzLogo} alt="Logo Tickitz" className="w-32 md:w-48" />
        </header>

        <main className="mt-5 flex justify-center relative z-10 pb-10">
          <section className="bg-white m-10 w-auto md:w-[450px] lg:w-[500px] p-6 md:p-9 rounded-lg">
            
            <div>
              <h2 className='text-[20px] font-medium mb-3 mt-5' style={{ fontFamily: "'Inter', sans-serif"}}>Forgot Password?</h2>
              <p className='text-gray-400 text-[15px] mb-2' style={{ fontFamily: "'Inter', sans-serif"}}>Enter email to get otp</p>
            </div>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                {successMessage}
              </div>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                {error}
              </div>
            )}

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
              
              <div className="w-full my-3">
                <label htmlFor="email" className="text-base font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-12 mt-2 p-3 border-2 rounded-md focus:ring-4 outline-none transition-colors ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-700 focus:ring-blue-300'
                  }`}
                  placeholder="Write Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <button 
                type="submit" 
                className="w-full h-12 mt-4 rounded-md bg-blue-700 text-white flex items-center justify-center font-medium hover:bg-blue-800 transition-colors"
              >
                Submit
              </button>
              
              <div className="w-full mt-4 text-center">
                <button 
                  type="button"
                  onClick={() => navigate('/auth/signIn')}
                  className="text-base font-semibold text-blue-700 hover:underline"
                >
                  Sign In
                </button>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  )
}

export default ForgotPassword;