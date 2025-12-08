import React, { useState } from 'react'
import TickitzLogo from '../assets/Tickitz1.svg';
import Background from '../assets/image1.svg'
import GoogleIcon from '../assets/google.svg'
import FacebookIcon from '../assets/facebook.svg'


function SignIn() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email", email);
        console.log("Password", password);
        setEmail("")
        setPassword("")
    }

    const passwordVisibility = () => {
        setShowPassword(!showPassword)
    }

  return (
     <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Mulish', sans-serif;
        }
      `}</style>
      
      <div className="relative min-h-screen">
        <div className="fixed inset-0 w-full h-full z-0">
          <img src={Background} alt="Background" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <header className="pt-16 flex justify-center relative z-10">
          <img src={TickitzLogo} alt="Logo Tickitz" className="w-35 md:w-70" />
        </header>

        <main className="mt-5 flex justify-center relative z-10 pb-10">
          <section className="bg-white w-[326px] md:w-[450px] lg:w-[500px] p-6 md:p-9 rounded-lg">
            <div>
                <h2 className='text-[20px] font-medium mb-3 mt-5' style={{ fontFamily: "'Inter', sans-serif"}}>Welcome Back👋</h2>
                <p className='text-gray-400 text-[15px] mb-2' style={{ fontFamily: "'Inter', sans-serif"}}>Sign in with your data that you entered during your registration</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full my-3">
                <label htmlFor="email" className="text-base font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-15 mt-2 p-3 border-2 border-gray-300 rounded-md focus:border-blue-700 focus:ring-4 focus:ring-blue-300 outline-none"
                  placeholder="Write Your Email"
                  required
                />
              </div>

              <div className="w-full my-3">
                <label htmlFor="password" className="text-base font-medium">
                  Password
                </label>

                <div className="relative w-full mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-15 p-3 pr-11 border-2 border-gray-300 rounded-md focus:border-blue-700 focus:ring-4 focus:ring-blue-300 outline-none"
                    placeholder="Write Your Password"
                    required
                  />

                  <button
                    type="button"
                    onClick={passwordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-700"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
                <p className= "text-gray-500 text-sm mb-3 text-right w-full">
                  <a href="#" className="text-blue-700 font-semibold hover:underline">
                    Forgot your password?
                  </a>
                </p>

              <button
                onClick={handleSubmit}
                className="w-full h-15 mt-4 rounded-md bg-blue-700 text-white transition duration-200 hover:bg-blue-900 hover:-translate-y-0.5 active:translate-y-0"
              >
                Login
              </button>
            </div>

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
          </section>
        </main>
      </div>
    </>
  )
}

export default SignIn