import React from 'react'
import Header from '../components/Header'
import OrderHistory from '../components/OrderHistory'
import SalesChart from '../components/SalesChart'
import HeaderAdmin from '../components/HeaderAdmin'
import ButtonScrollToTop from '../components/ButtonScrolToTop'

function DashboardAdmin() {
  return (
    <>
        <main className='h-full bg-[#A0A3BD33] p-10'>
            <section className='bg-white ml-20 mr-20 rounded-3xl p-15'>
                <p className='text-3xl font-bold'>Sales Chart</p>
                <div className='mt-8 flex gap-5'>
                    <select className='text-xl font-semibold text-[#4E4B66] bg-[#EFF0F6] p-5 pl-15 pr-15 text-left rounded-lg'>
                        <option>Movie Names</option>
                        <option>Movie 1</option>
                        <option>Movie 2</option>
                        <option>Movie 3</option>
                    </select>
                    <select className='text-xl font-semibold text-[#4E4B66] bg-[#EFF0F6] p-5 pl-15 pr-15 text-left rounded-lg'>
                        <option>Weekly</option>
                        <option>Movie 1</option>
                        <option>Movie 2</option>
                        <option>Movie 3</option>
                    </select>
                    <button className='text-xl font-semibold text-white bg-[#1D4ED8] p-5 pl-15 pr-15 text-left rounded-lg'>
                        Filter
                    </button>
                </div>

                <p className='mt-15 text-xl font-bold'>Avengers: End Game</p>
                <SalesChart/>
            </section>

            <section className='bg-white m-20 rounded-3xl p-15'>
                <p className='text-3xl font-bold'>Ticket Sales</p>
                <div className='mt-8 flex gap-5'>
                    <select className='text-xl font-semibold text-[#4E4B66] bg-[#EFF0F6] p-5 pl-15 pr-15 text-left rounded-lg'>
                        <option>Category</option>
                        <option>Movie 1</option>
                        <option>Movie 2</option>
                        <option>Movie 3</option>
                    </select>
                    <select className='text-xl font-semibold text-[#4E4B66] bg-[#EFF0F6] p-5 pl-15 pr-15 text-left rounded-lg'>
                        <option>Location</option>
                        <option>Bandung</option>
                        <option>Jakarta</option>
                        <option>Bogor</option>
                    </select>
                    <button className='text-xl font-semibold text-white bg-[#1D4ED8] p-5 pl-15 pr-15 text-left rounded-lg'>
                        Filter
                    </button>
                </div>

                <p className='mt-15 text-xl font-bold'>Avengers: End Game</p>
                <SalesChart/>
            </section>
        </main>

        <ButtonScrollToTop/>
    </>
  )
}

export default DashboardAdmin