import React from 'react'
import Plus from '../assets/bi_plus.svg'

function AddNewMovie() {
  return (
    <>
        <main>
        <div className="absolute flex w-screen h-fit inset-0 items-center justify-center after:absolute after:inset-0 after:z-10 after:bg-black/50">
          <div className="bg-white m-90 mt-20 w-full flex flex-col rounded-lg p-10 z-20">
            <p className='text-2xl font-bold'>Add New Movie</p>
            <div className='mt-10 flex flex-col'>
               <label className='text-[#696F79] text-lg'>Upload Image</label>
               <button className='bg-[#1D4ED8] p-2 w-30 rounded-sm text-white mt-3'>Upload</button>
            </div>

            <div className='mt-7 flex flex-col gap-3'>
                <label className='text-[#696F79] text-lg'>Upload Image</label>
                <input type="text" placeholder='Movie Name' className='p-4 text-lg border-2 border-[#DEDEDE] rounded-lg' />
            </div>

            <div className='mt-7 flex flex-col gap-3'>
                <label className='text-[#696F79] text-lg'>Category</label>
                <input type="text" placeholder='Add Category' className='p-4 text-lg border-2 border-[#DEDEDE] rounded-lg' />
            </div>

            <div className='mt-7 flex justify-between items-center gap-3'>
                <div className='flex flex-col gap-3'>
                    <label className='text-[#696F79] text-lg'>Release date</label>
                    <input type="date" className='p-4 text-lg border-2 w-100 border-[#DEDEDE] rounded-lg' />
                </div>
                <div className='flex flex-col gap-3'>
                    <label className='text-[#696F79] text-lg'>Duration (hour / minute)</label>
                    <div className='flex gap-3'>
                        <input type="number" className='p-4 text-lg w-40 border-2 border-[#DEDEDE] rounded-lg' />
                        <input type="number" className='p-4 text-lg w-40 border-2 border-[#DEDEDE] rounded-lg' />
                    </div>
                </div>
            </div>

            <div className='mt-7 flex flex-col gap-3'>
                <label className='text-[#696F79] text-lg'>Director Name</label>
                <input type="text" className='p-4 text-lg border-2 border-[#DEDEDE] rounded-lg' />
            </div>
           
            <div className='mt-7 flex flex-col gap-3'>
                <label className='text-[#696F79] text-lg'>Cast</label>
                <input type="text" className='p-4 text-lg border-2 border-[#DEDEDE] rounded-lg' />
            </div>
            
            <div className='mt-7 flex flex-col gap-3'>
                <label className='text-[#696F79] text-lg'>Synopsis</label>
                <textarea type="" className='p-4 resize-none h-50 text-lg border-2 border-[#DEDEDE] rounded-lg' />
            </div>

            <div className='mt-7 flex flex-col gap-3'>
                <label className='text-[#696F79] text-lg'>Add Location</label>
                <input type="text" className='p-4 text-lg border-2 border-[#DEDEDE] rounded-lg' />
            </div>
            
            <div className='mt-7 flex flex-col gap-3'>
                <label className='text-[#696F79] text-lg'>Set Date</label>
                <select name="" id="" className='bg-[#EFF0F6] text-lg text-[#4E4B66] font-semibold p-3 w-50'>
                    <option value="">Set a Date</option>
                </select>
                <div className='pt-5 flex items-center gap-8'>
                    <button className='p-1 pl-5 pr-5 rounded-lg border-2 border-[#5F2EEA]'>
                        <img src={Plus} alt="" />
                    </button>
                    <div className='flex gap-3'>
                        <p className='text-lg text-[#4E4B66] font-semibold'>08:30am</p>
                        <p className='text-lg text-[#4E4B66] font-semibold'>10:30pm</p>
                    </div>
                </div>
            </div>

            <label className='border w-full mt-10 border-[#DEDEDE] '></label>
            <button className='bg-[#1D4ED8] text-xl font-semibold p-5 rounded-lg text-white'>
                Save Movie
            </button>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddNewMovie