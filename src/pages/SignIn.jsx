import React, { useState } from 'react'
import TickitzLogo from '../assets/Tickitz1.svg'
import Background from '../assets/image1.svg'
import GoogleIcon from '../assets/google.svg'
import FacebookIcon from '../assets/facebook.svg'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'

function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch({
      type: "LOGIN",
      payload: {
        username: email,
      }
    })

    setEmail("")
    setPassword("")
    navigate("/")
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
          <img src={TickitzLogo} alt="Logo Tickitz" className="w-45 md:w-70" />
        </header>

        <main className="mt-5 flex justify-center relative z-10 pb-10">
          <section className="bg-white m-10 w-auto md:w-[450px] lg:w-[500px] p-6 md:p-9 rounded-lg">
            <div>
              <h2 className='text-[20px] font-medium mb-3 mt-5' style={{ fontFamily: "'Inter', sans-serif"}}>Welcome Back👋</h2>
              <p className='text-gray-400 text-[15px] mb-2' style={{ fontFamily: "'Inter', sans-serif"}}>Sign in with your data that you entered during your registration</p>
            </div>

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="w-full my-3">
                <label htmlFor="email" className="text-base font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-15 mt-2 p-3 border-2 border-gray-300 rounded-md focus:border-blue-700 focus:ring-4 focus:ring-blue-300 outline-none"
                  placeholder="Write Your Email"
                  required
                />
              </div>

              <div className="w-full my-3">
                <label htmlFor="password" className="text-base font-medium">Password</label>

                <div className="relative w-full mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
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
              </div>

              <button className="w-full h-15 mt-4 rounded-md bg-blue-700 text-white">
                Login
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
          </section>
        </main>
      </div>
    </>
  )
}

export default SignIn
