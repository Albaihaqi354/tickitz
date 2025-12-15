import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { registerUser } from "../redux/slices/auth.slice";
import TickitzLogo from '../assets/Tickitz1.svg';
import Background from '../assets/image1.svg'
import GoogleIcon from '../assets/google.svg'
import FacebookIcon from '../assets/facebook.svg'

function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resultAction = await dispatch(registerUser({ email, password }))
      if (registerUser.fulfilled.match(resultAction)) {
        navigate("/auth/signIn")
      } else {
        console.error(resultAction.error.message)
      }
    } catch (err) {
      console.error(err)
    }

    setEmail("")
    setPassword("")
  }

  const passwordVisibility = () => setShowPassword(!showPassword)

  return (
    <>
      <div className="relative min-h-screen">
        <div className="fixed inset-0 w-full h-full z-0">
          <img src={Background} alt="Background" className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-black/55"></div>
        </div>

        <header className="pt-16 flex justify-center relative z-10">
          <img src={TickitzLogo} alt="Logo Tickitz" className="w-35 md:w-70" />
        </header>

        <main className="mt-5 flex justify-center relative z-10 pb-10">
          <section className="bg-white w-auto md:w-[450px] lg:w-[500px] p-6 md:p-9 rounded-lg">
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

            <form className="flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="w-full my-3">
                <label htmlFor="email" className="text-base font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-15 mt-2 p-5 border-2 border-gray-300 rounded-md focus:border-blue-700 focus:ring-4 focus:ring-blue-300 outline-none"
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.062-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <div className="hidden sm:flex mb-5 gap-2 items-center w-full text-left">
                <input type="checkbox" className="w-4 h-4" required />
                <p className="text-[#696F79]">I agree to terms & conditions</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-15 mt-4 rounded-md bg-blue-700 text-white transition duration-200 hover:bg-blue-900 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Join for Free"}
              </button>

              <p className="text-center text-gray-500 text-sm mt-6">
                Already have an account?{" "}
                <a href="/auth/signIn" className="text-blue-700 font-semibold hover:underline">Log in</a>
              </p>
            </form>

            <div className="flex items-center justify-center gap-3 text-gray-400 text-sm my-6">
              <span className="flex-1 h-px bg-gray-300"></span>
              <span>or</span>
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
  );
}

export default SignUp;
