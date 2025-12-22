import React, { useState } from 'react'
import TickitzLogo from '../assets/tickitz1.svg'
import Background from '../assets/image1.svg'
import GoogleIcon from '../assets/google.svg'
import FacebookIcon from '../assets/facebook.svg'
import { useNavigate } from 'react-router'
import { useUserContext } from '../contexts/userManagement/UserProvider'

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [errors, setErrors] = useState({})

  const { registerUser, isLoading, error } = useUserContext()
  const navigate = useNavigate()

  const validateForm = () => {
    const newErrors = {}
    
    if (!email) {
      newErrors.email = "Email harus diisi"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Format email tidak valid"
    }
    
    if (!password) {
      newErrors.password = "Password harus diisi"
    } else if (password.length < 8) {
      newErrors.password = "Password minimal 8 karakter"
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password harus mengandung huruf dan angka"
    }

    if (!agreeToTerms) {
      newErrors.agreeToTerms = "Anda harus menyetujui syarat dan ketentuan";
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const result = await registerUser(email, password)
      
      if (result.success) {
        setEmail("")
        setPassword("")
        setAgreeToTerms(false)
        navigate("/auth/signIn")
      }
    }
  }

  const passwordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 w-full h-full z-0">
          <img src={Background} alt="Background" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <header className="pt-16 flex justify-center relative z-10">
          <img src={TickitzLogo} alt="Logo Tickitz" className="w-45 md:w-70" />
        </header>

        <main className="mt-5 flex justify-center relative z-10 pb-10">
          <section className="bg-white m-10 w-auto md:w-[450px] lg:w-[500px] p-6 md:p-9 rounded-lg">
           <div className="hidden md:flex justify-center items-center gap-5 text-center mb-6">
              <div className="flex flex-col items-center">
                <p className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-full">1</p>
                <p className="text-sm mt-1">Fill Form</p>
              </div>
              <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>
              <div className="flex flex-col items-center">
                <p className="w-12 h-12 flex items-center justify-center bg-gray-400 text-white rounded-full">2</p>
                <p className="text-sm mt-1">Active</p>
              </div>
              <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>
              <div className="flex flex-col items-center">
                <p className="w-12 h-12 flex items-center justify-center bg-gray-400 text-white rounded-full">3</p>
                <p className="text-sm mt-1">Done</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
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
                  className={`w-full h-15 mt-2 p-3 border-2 rounded-md focus:ring-4 outline-none ${
                    errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-700 focus:ring-blue-300'
                  }`}
                  placeholder="Write Your Email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="w-full my-3">
                <label htmlFor="password" className="text-base font-medium">Password</label>

                <div className="relative w-full mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full h-15 p-3 pr-11 border-2 rounded-md focus:ring-4 outline-none ${
                      errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-blue-700 focus:ring-blue-300'
                    }`}
                    placeholder="Write Your Password"
                  />

                  <button
                    type="button"
                    onClick={passwordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700"
                  >
                    {showPassword ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="w-full my-3">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className={`mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                      errors.agreeToTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <label htmlFor="agreeToTerms" className="ml-2 text-base text-gray-600">
                    I agree to the Terms & Conditions
                  </label>
                </div>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
              </div>

              <button 
                type="submit" 
                className="w-full h-15 mt-4 rounded-md bg-blue-700 text-white flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                Sign Up
              </button>
            </form>
             <div className="flex items-center justify-center gap-3 text-gray-400 text-sm my-6">
              <span className="flex-1 h-px bg-gray-300"></span>{" "}
              <span style={{ fontFamily: "'Inter', sans-serif" }}>or</span>{" "}
              <span className="flex-1 h-px bg-gray-300"></span>
            </div>

            <div className="flex justify-center gap-4 pb-6">
              <div className="bg-white p-4 rounded-md shadow-md cursor-pointer hover:-translate-y-1 transition">
                <img src={GoogleIcon} alt="Google Login" className="w-6 h-6" />
              </div>

              <div className="bg-white p-4 rounded-md shadow-md cursor-pointer hover:-translate-y-1 transition">
                <img src={FacebookIcon} alt="Facebook Login" className="w-6 h-6" />
              </div>
            </div>

            <div className="text-center text-gray-600 mt-4">
              Already have an account? 
              <button 
                onClick={() => navigate('/auth/signIn')} 
                className="text-blue-700 hover:underline ml-1 font-medium"
              >
                Sign In
              </button>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default SignUp