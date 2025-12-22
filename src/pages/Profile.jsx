import OrderHistory from "../components/OrderHistory";
import Star from "../assets/star.svg";
import { useState } from "react";

function Profile() {
    // Gunakan satu state untuk melacak tab yang aktif
    const [activeTab, setActiveTab] = useState("account"); // "account" atau "order"

    return (
    <>
      <main className="bg-[#A0A3BD33] md:flex justify-center pr-15 pl-15">
        <section className="bg-white md:w-1/4 m-10 rounded-3xl">
          <div className="flex justify-between m-8 items-center">
            <p className="text-xl text-[#4E4B66]">INFO</p>
            <div className="flex gap-1">
              <span className="bg-[#5F2EEA] w-2 h-2 rounded-full"></span>
              <span className="bg-[#5F2EEA] w-2 h-2 rounded-full"></span>
              <span className="bg-[#5F2EEA] w-2 h-2 rounded-full"></span>
            </div>
          </div>
          <div className="flex flex-col items-center m-8 mt-10">
            <img
              src=""
              alt="Profile"
              className="bg-[#5F2EEA] rounded-full w-40 h-40"
            />
            <p className="text-2xl font-semibold mt-7">Jonas El Rodriguez</p>
            <p className="mt-2 text-[18px] text-[#4E4B66]">Moviegoers</p>
          </div>

          <div className="border-t-2 border-[#DEDEDE] w-full mt-10"></div>

          <div className="m-8">
            <p className="text-[#4E4B66] text-xl font-semibold">
              Loyality Point
            </p>
            <div className="bg-[#1D4ED8] relative p-5 rounded-3xl mt-8">
              <div className="absolute -top-27 right-10 w-10 h-10 sm:w-10 sm:h-10 md:w-28 md:h-28 lg:w-28 lg:h-28 bg-white/40 rounded-full translate-x-1/2 translate-y-1/2"></div>
              <div className="absolute -top-18 right-5 w-10 h-10 sm:w-10 sm:h-10 md:w-28 md:h-28 lg:w-28 lg:h-28 bg-white/40 rounded-full translate-x-1/2 translate-y-1/2"></div>
              <img
                src={Star}
                alt="Background"
                className=" absolute -top-8 right-8 w-15 h-15 translate-x-1/2 translate-y-1/2 object-cover"
              />
              <p className="text-white text-2xl">Moviegoers</p>
              <div className="mt-10">
                <p className="text-2xl font-semibold text-white">
                  320
                  <span className="text-white ml-1 text-[12px]">Points</span>
                </p>
              </div>
            </div>

            <div className="mt-10 pb-15 text-center">
              <p className="text-xl text-[#4E4B66]">
                180 points become a master
              </p>
              <div className="flex justify-center mt-5">
                <span className="items-center bg-[#F5F6F8] inset-shadow-sm inset-shadow-black-500 rounded-full w-85 h-6">
                  <div className="flex">
                    <span className="items-center bg-[#1D4ED8] inset-shadow-sm inset-shadow-black-500 rounded-full w-35 h-6"></span>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full">
          <section className="bg-white m-10 rounded-3xl gap-15 flex p-10 pb-0">
            <button 
              onClick={() => setActiveTab("account")} 
              className={`text-xl pb-10 cursor-pointer hover:text-[#1D4ED8] ${
                activeTab === "account" ? "border-b-3 border-[#1D4ED8]" : "text-[#AAAAAA]"
              }`}
            >
              Account Settings
            </button>
            <button 
              onClick={() => setActiveTab("order")} 
              className={`text-xl pb-10 cursor-pointer hover:text-[#1D4ED8] ${
                activeTab === "order" ? "border-b-3 border-[#1D4ED8]" : "text-[#AAAAAA]"
              }`}
            >
              Order History
            </button>
          </section>

          {activeTab === "account" && (
            <section>
              <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15">
                <p className="text-xl">Details Information</p>
                <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>
                <form action="" className="flex justify-between gap-10 mt-10">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="" className="text-xl text-[#4E4B66]">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl"
                    />
                    <label htmlFor="" className="text-xl text-[#4E4B66] mt-5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      className="h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label htmlFor="" className="text-xl text-[#4E4B66]">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl"
                    />
                    <label htmlFor="" className="text-xl text-[#4E4B66] mt-5">
                      Phone Number
                    </label>
                    <input
                      type="number"
                      className="h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl"
                    />
                  </div>
                </form>
              </section>

              <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15 pb-15">
                <p className="text-xl">Account and Privacy</p>
                <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>
                <form action="" className="flex justify-between gap-10 mt-10">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="" className="text-xl text-[#4E4B66]">
                      New Password
                    </label>
                    <input
                      type="password"
                      placeholder="Write New Password"
                      className="h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl"
                    />
                  </div>

                  <div className="flex flex-col w-1/2">
                    <label htmlFor="" className="text-xl text-[#4E4B66]">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm your Password"
                      className="h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl"
                    />
                  </div>
                </form>
              </section>

              <button className="rounded-3xl m-10 mt-0 text-base border-2 font-bold bg-[#1D4ED8] hover:border-2 text-white p-5 pl-25 pr-25 cursor-pointer hover:text-[#1D4ED8] hover:bg-white">
                Update changes
              </button>
            </section>
          )}

          {activeTab === "order" && (
            <section>
              <OrderHistory/>
            </section>
          )}
        </section>
      </main>
      <ButtonScrollToTop/>
    </>
  );
}

export default Profile;