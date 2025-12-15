import OrderHistory from '../components/OrderHistory'

function Profile() {
  return (
    <>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');

        * {
          font-family: 'Mulish', sans-serif;
        }
      `}</style>
        <main className='bg-[#A0A3BD33] flex justify-center pr-15 pl-15'>
            <section className='bg-white w-1/4 m-10 rounded-3xl'>
                <div className='flex justify-between m-8 items-center'>
                    <p className='text-xl text-[#4E4B66]'>INFO</p>
                    <div className='flex gap-1'>
                        <span className='bg-[#5F2EEA] w-2 h-2 rounded-full'></span>
                        <span className='bg-[#5F2EEA] w-2 h-2 rounded-full'></span>
                        <span className='bg-[#5F2EEA] w-2 h-2 rounded-full'></span>
                    </div>
                </div>
                <div className='flex flex-col items-center m-8 mt-10'>
                    <img src="" alt="Profile" className='bg-[#5F2EEA] rounded-full w-40 h-40' />
                    <p className='text-2xl font-semibold mt-7'>Jonas El Rodriguez</p>
                    <p className='mt-2 text-[18px] text-[#4E4B66]'>Moviegoers</p>
                </div>
                
                <div className="border-t-2 border-[#DEDEDE] w-full mt-10"></div>
                
                <div className='m-8'>
                    <p className='text-[#4E4B66] text-xl font-semibold'>Loyality Point</p>
                    <div className='bg-[#1D4ED8] p-5 rounded-3xl mt-8'>
                        <p className='text-white text-2xl'>Moviegoers</p>
                        <div className='mt-10'>
                            <p className='text-2xl font-semibold text-white'>
                                320
                                <span className='text-white ml-1 text-[12px]'>Points</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className='mt-10 pb-15 text-center'>
                        <p className='text-xl text-[#4E4B66]'>180 points become a master</p>
                        <div className='flex justify-center mt-5'>
                            <span className="items-center bg-[#F5F6F8] inset-shadow-sm inset-shadow-black-500 rounded-full w-85 h-6">
                                <div className='flex'>
                                    <span className="items-center bg-[#1D4ED8] inset-shadow-sm inset-shadow-black-500 rounded-full w-35 h-6">
                                    </span>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='w-full'>
                <section className='bg-white m-10 rounded-3xl gap-15 flex p-10 pb-0'>
                    <p className='text-xl border-b-3 border-[#1D4ED8] pb-10'>Account Settings</p>
                    <p className='text-xl text-[#AAAAAA]'>Order History</p>
                </section>

                <OrderHistory/>
                
                {/* <section className='bg-white m-10 rounded-3xl gap-15 p-10 pt-15'>
                    <p className='text-xl'>Details Information</p>
                    <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>
                    <form action="" className='flex justify-between gap-10 mt-10'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="" className='text-xl text-[#4E4B66]'>First Name</label>
                            <input type="text" className='h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl' />   
                            <label htmlFor="" className='text-xl text-[#4E4B66] mt-5'>E-mail</label>
                            <input type="email" className='h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl' />   
                        </div>
                        
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="" className='text-xl text-[#4E4B66]'>Last Name</label>
                            <input type="text" className='h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl' />   
                            <label htmlFor="" className='text-xl text-[#4E4B66] mt-5'>Phone Number</label>
                            <input type="number" className='h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl' />   
                        </div>
                    </form>
                </section>
                
                <section className='bg-white m-10 rounded-3xl gap-15 p-10 pt-15'>
                    <p className='text-xl'>Account and Privacy</p>
                    <div className="border-t-2 border-[#DEDEDE] w-full mt-8"></div>
                    <form action="" className='flex justify-between gap-10 mt-10'>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="" className='text-xl text-[#4E4B66]'>New Password</label>
                            <input type="password" placeholder='Write your password' className='h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl' />  
                        </div>
                        <div className='flex flex-col w-1/2'>
                            <label htmlFor="" className='text-xl text-[#4E4B66]'>Confirm Password</label>
                            <input type="password" placeholder='Confirm your password' className='h-15 mt-2 p-3 border-2 border-gray-300 rounded-xl' />  
                        </div>
                    </form>
                </section> */}

            </section>
        </main>
    </>
  )
}

export default Profile