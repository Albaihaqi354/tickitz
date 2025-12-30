import React from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import Eye from "../assets/Eye.svg"
import Edit from "../assets/Edit.svg"
import Delete from "../assets/Delete.svg"
import ButtonScrollToTop from "../components/ButtonScrolToTop";

function MovieAdmin() {
  return (
    <>
      <main className="h-full bg-[#A0A3BD33] p-10">
        <section className="bg-white ml-20 mr-20 rounded-3xl p-15">
          <article className="flex justify-between items-center">
            <p className="text-3xl font-bold">List Movie</p>
            <div className="flex gap-5">
              <select className="bg-[#EFF0F6] cursor-pointer text-xl p-4 pl-15 pr-15 rounded-lg">
                <option>Januari 2025</option>
                <option>Februari 2025</option>
                <option>Maret 2025</option>
                <option>April 2025</option>
              </select>
              <button className="bg-[#1D4ED8] text-white text-xl p-4 pl-15 pr-15 cursor-pointer rounded-lg">
                Add Movies
              </button>
            </div>
          </article>

          <article className="mt-10 flex justify-center">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-[#1F4173] text-xl border-b-2 border-[#E6EAF0] p-4">
                    No
                  </th>
                  <th className="text-[#1F4173] text-xl border-b-2 border-[#E6EAF0] p-4">
                    Thumnail
                  </th>
                  <th className="text-[#1F4173] text-xl border-b-2 border-[#E6EAF0] p-4">
                    Movie Name
                  </th>
                  <th className="text-[#1F4173] text-xl border-b-2 border-[#E6EAF0] p-4">
                    Category
                  </th>
                  <th className="text-[#1F4173] text-xl border-b-2 border-[#E6EAF0] p-4">
                    Released Date
                  </th>
                  <th className="text-[#1F4173] text-xl border-b-2 border-[#E6EAF0] p-4">
                    Duration
                  </th>
                  <th className="text-[#1F4173] text-xl border-b-2 border-[#E6EAF0] p-4">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="text-xl border-b-2 border-[#E6EAF0] p-4">1</td>
                  <td className="text-xl border-b-2 border-[#E6EAF0] p-4 flex justify-center">
                    <img src="" alt="" className="bg-amber-300 w-15 h-12 rounded-lg" />
                  </td>
                  <td className="text-[#1D4ED8] text-base border-b-2 border-[#E6EAF0] p-4">
                    Spiderman HomeComing
                  </td>
                  <td className="text-base border-b-2 border-[#E6EAF0] p-4">
                    Action Adventure
                  </td>
                  <td className="text-base border-b-2 border-[#E6EAF0] p-4">
                    07/05/2005
                  </td>
                  <td className="text-base border-b-2 border-[#E6EAF0] p-4">
                    2 Hours 15 Minute
                  </td>
                  <td className="text-base border-b-2 border-[#E6EAF0] p-4 flex gap-2 justify-center">
                    <button className="bg-[#1D4ED8] p-2 rounded-lg cursor-pointer">
                        <img src={Eye} alt="Eye" className="w-5 h-5" />
                    </button>
                    <button className="bg-[#5D5FEF] p-2 rounded-lg cursor-pointer">
                        <img src={Edit} alt="Eye" className="w-5 h-5" />
                    </button>
                    <button className="bg-[#E82C2C] p-2 rounded-lg cursor-pointer">
                        <img src={Delete} alt="Eye" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </article>

          <div className="flex justify-center gap-2 mt-10">
            <button className="bg-[#1D4ED8] p-2 pl-4 pr-4 cursor-pointer text-base text-white rounded-lg">1</button>
            <button className="p-2 pl-4 pr-4 text-base border rounded-lg cursor-pointer">2</button>
            <button className="p-2 pl-4 pr-4 text-base border rounded-lg cursor-pointer">3</button>
            <button className="p-2 pl-4 pr-4 text-base border rounded-lg cursor-pointer">4</button>
          </div>
        </section>
      </main>
      <ButtonScrollToTop/>
    </>
  );
}

export default MovieAdmin;
