import CineOneLogo from "../assets/CineOne21.svg";
import EbvLogo from '../assets/ebv.svg';

function OrderHistory() {
  return (
    <main>
      <section className="w-full">
        <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-[#AAAAAA]">
                Tuesday, 07 July 2020 - 04:30pm
              </p>
              <p className="text-3xl font-bold mt-5">Spider-Man: Homecoming</p>
            </div>
            <div>
              <img
                src={CineOneLogo}
                alt="CineOne Logo"
                className="w-32 md:w-36 lg:w-40 xl:w-45 h-auto"
              />
            </div>
          </div>

          <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>

          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <button className="text-xl font-semibold text-[#00BA88] bg-[#00BA8833] rounded-xl p-3 pr-10 pl-10">
                Ticket in active
              </button>
              <button className="text-xl font-semibold text-[#E82C2C] bg-[#E82C2C33] rounded-xl p-3 pr-10 pl-10">
                Not Paid
              </button>
            </div>
            <select name="" id="" className="text-[#AAAAAA] text-xl w-45">
              <option value="">Show Details</option>
            </select>
          </div>
        </section>

        <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-[#AAAAAA]">
                Monday, 14 June 2020 - 02:00pm
              </p>
              <p className="text-3xl font-bold mt-5">Avengers: End Game</p>
            </div>
            <div>
                <img src={EbvLogo} alt="EBV Logo" className="w-20 md:w-32 lg:w-35 h-auto" />
            </div>
          </div>

          <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>

          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <button className="text-xl font-semibold text-[#6E7191] bg-[#6E719133] rounded-xl p-3 pr-10 pl-10">
                Ticket used
              </button>
              <button className="text-xl font-semibold text-[#1D4ED8] bg-[#1D4ED833] rounded-xl p-3 pr-10 pl-10">
                Paid
              </button>
            </div>
            <select name="" id="" className="text-[#AAAAAA] text-xl w-45">
              <option value="">Show Details</option>
            </select>
          </div>
        </section>
        
        <section className="bg-white m-10 rounded-3xl gap-15 p-10 pt-15">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl text-[#AAAAAA]">
                Monday, 14 June 2020 - 02:00pm
              </p>
              <p className="text-3xl font-bold mt-5">Avengers: End Game</p>
            </div>
            <div>
                <img src={EbvLogo} alt="EBV Logo" className="w-20 md:w-32 lg:w-35 h-auto" />
            </div>
          </div>

          <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>

          <div className="flex justify-between mt-10">
            <div className="flex gap-5">
              <button className="text-xl font-semibold text-[#6E7191] bg-[#6E719133] rounded-xl p-3 pr-10 pl-10">
                Ticket used
              </button>
              <button className="text-xl font-semibold text-[#1D4ED8] bg-[#1D4ED833] rounded-xl p-3 pr-10 pl-10">
                Paid
              </button>
            </div>
            <select name="" id="" className="text-[#AAAAAA] text-xl w-45">
              <option value="">Show Details</option>
            </select>
          </div>
        </section>
      </section>
    </main>
  );
}

export default OrderHistory;
