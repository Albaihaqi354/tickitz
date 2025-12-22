import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail } from '../redux/slices/movie.slice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CineOneLogo from '../assets/CineOne21.svg';
import ButtonScrollToTop from '../components/ButtonScrolToTop';

function Order() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { detail: movie, loading } = useSelector((state) => state.movie);

  const [selectedSeats, setSelectedSeats] = useState([]);
  
  const ticketPrice = 10;
  const showDate = "Tuesday, 07 July 2020";
  const showTime = "13:00";

  const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    if (id) {
      dispatch(fetchMovieDetail(id));
    }
  }, [id, dispatch]);

  const handleSeatClick = (seat) => {
    setSelectedSeats(prev => {
      if (prev.includes(seat)) {
        return prev.filter(s => s !== seat);
      } else {
        return [...prev, seat];
      }
    });
  };

  const handleCheckout = () => {
    console.log('Tombol checkout diklik');

    if (selectedSeats.length === 0) {
      return;
    }

    const orderData = {
      movie,
      selectedSeats,
      showDate,
      showTime,
      ticketPrice,
      totalPrice: selectedSeats.length * ticketPrice
    };

    console.log('Data yang akan dikirim ke payment:', orderData);
    navigate('payment', { state: orderData });
    console.log('Perintah navigate telah dijalankan.');
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const leftSeats = [1, 2, 3, 4, 5, 6, 7];
  const rightSeats = [8, 9, 10, 11, 12, 13, 14];

  const soldSeats = ['A6', 'B2', 'B3', 'D2', 'E4', 'G3'];
  const loveNestSeats = ['F10', 'F11'];

  const getSeatStatus = (seat) => {
    if (selectedSeats.includes(seat)) return 'selected';
    if (soldSeats.includes(seat)) return 'sold';
    if (loveNestSeats.includes(seat)) return 'love';
    return 'available';
  };

  const getSeatColor = (status) => {
    switch (status) {
      case 'selected': return 'bg-[#1D4ED8] cursor-pointer';
      case 'sold': return 'bg-[#6E7191] cursor-not-allowed';
      case 'love': return 'bg-[#F589D7] cursor-pointer';
      default: return 'bg-[#D6D8E7] cursor-pointer';
    }
  };

  if (loading && !movie) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-[#1D4ED8]">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className='bg-[#A0A3BD33]'>
        <section className='pt-10'>
          <div className="hidden md:flex justify-center items-center gap-5 text-center mb-10">
            <div className="flex flex-col items-center">
              <p className="w-12 h-12 flex items-center justify-center bg-green-700 text-white rounded-full">1</p>
              <p className="text-sm mt-1">Dates And Time</p>
            </div>
            <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>
            <div className="flex flex-col items-center">
              <p className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-full">2</p>
              <p className="text-sm mt-1">Seat</p>
            </div>
            <div className="border-t-2 border-dashed border-gray-400 w-16 mb-6"></div>
            <div className="flex flex-col items-center">
              <p className="w-12 h-12 flex items-center justify-center bg-gray-400 text-white rounded-full">3</p>
              <p className="text-sm mt-1">Payment</p>
            </div>
          </div>
        </section>
        
        <section className='flex gap-5 justify-center flex-wrap lg:flex-nowrap px-5'>
          <article className='bg-white w-full lg:w-2xl mb-20 rounded-md'>
            <div className='m-5 rounded-md border-solid border-2 border-[#DEDEDE]'>
              <div className='flex flex-col sm:flex-row m-5 gap-5'>
                {movie && movie.poster_path ? (
                  <img src={TMDB_IMAGE_BASE + movie.poster_path} alt={movie.title} className='w-full sm:w-60 h-50 sm:h-35 rounded object-cover' />
                ) : (
                  <div className='w-full sm:w-60 h-35 bg-gray-300 rounded'></div>
                )}
                <div className='w-full sm:w-100'>
                  <p className='text-xl sm:text-2xl font-semibold'>{movie?.title || 'Loading...'}</p>
                  <div className='flex gap-3 flex-wrap mt-2'>
                    {movie?.genres?.slice(0, 2).map(genre => (
                      <p key={genre.id} className='bg-[#A0A3BD1A] p-1 pr-3 pl-3 rounded-full text-[#A0A3BD] text-sm sm:text-base'>{genre.name}</p>
                    ))}
                  </div>
                  <div className='flex flex-col sm:flex-row justify-between mt-3 gap-2'>
                    <p className='font-semibold text-sm sm:text-base'>Regular - {showTime} PM</p>
                    <button className='bg-[#1D4ED8] text-white p-1 pr-3 pl-3 rounded-md hover:bg-[#1a45b8] transition text-sm sm:text-base'>Change</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='m-5 mt-8 mb-20'>
              <p className='text-xl sm:text-2xl font-bold'>Choose Your Seat</p>
              <p className='text-[#4E4B66] hidden sm:block text-center mt-8'>Screen</p>
              <div className='overflow-x-auto'>
                <div className='flex justify-center gap-4 sm:gap-10 mt-8 min-w-max px-4'>
                  <div className='grid grid-cols-8 gap-2'>{rows.map(row => (<React.Fragment key={row}><span className='flex items-center justify-center text-sm'>{row}</span>{leftSeats.map(num => {const seat = `${row}${num}`; const status = getSeatStatus(seat); return (<span key={seat} onClick={() => status !== 'sold' && handleSeatClick(seat)} className={`w-6 h-6 rounded-md ${getSeatColor(status)}`}></span>);})}</React.Fragment>))}<span></span>{leftSeats.map(num => (<span key={num} className='text-center text-xs'>{num}</span>))}</div>
                  <div className='flex flex-col gap-2'>{rows.map(row => (<div key={row} className='flex gap-2'>{rightSeats.map(num => {const seat = `${row}${num}`; const status = getSeatStatus(seat); const isF10 = seat === 'F10'; const isF11 = seat === 'F11'; if (isF11) return null; return (<span key={seat} onClick={() => status !== 'sold' && handleSeatClick(seat)} className={`h-6 rounded-md ${getSeatColor(status)} ${isF10 ? 'w-14' : 'w-6'}`}></span>);})}</div>))}<div className='flex gap-2'>{rightSeats.map(num => (<span key={num} className='text-center text-xs w-6'>{num}</span>))}</div></div>
                </div>
              </div>
              <div className='mt-8'><p className='text-lg sm:text-xl font-semibold'>Seating Key</p><div className='flex flex-wrap justify-center gap-4 sm:gap-10 mt-5 text-sm sm:text-base'><p className='text-[#4E4B66]'>Available</p><div className='flex gap-2 items-center'><p className='bg-[#1D4ED8] w-6 h-6 rounded-md'></p><p className='text-[#4E4B66]'>Selected</p></div><div className='flex gap-2 items-center'><p className='bg-[#F589D7] w-6 h-6 rounded-md'></p><p className='text-[#4E4B66]'>Love Nest</p></div><div className='flex gap-2 items-center'><p className='bg-[#6E7191] w-6 h-6 rounded-md'></p><p className='text-[#4E4B66]'>Sold</p></div></div></div>
            </div>
          </article>

          <section className='flex flex-col items-center w-full lg:w-auto'>
            <article className='bg-white h-fit rounded-md w-full lg:w-auto'>
              <div className='m-6 sm:m-10 flex flex-col'>
                <div className='flex justify-center'><img src={CineOneLogo} alt="CineOne Logo" className="w-32 sm:w-36 lg:w-40 xl:w-45 h-auto" /></div>
                <p className='text-2xl sm:text-3xl font-semibold mt-3 mb-7 text-center'>CineOne21 Cinema</p>
                <div className='flex flex-col gap-5 text-sm sm:text-base'>
                  <div className='flex justify-between gap-5'><p className='text-[#6B6B6B] font-semibold'>Movie selected</p><p className='font-semibold text-right'>{movie?.title || 'N/A'}</p></div>
                  <div className='flex justify-between gap-5'><p className='text-[#6B6B6B] font-semibold'>{showDate}</p><p className='font-semibold'>{showTime}</p></div>
                  <div className='flex justify-between gap-5'><p className='text-[#6B6B6B] font-semibold'>One ticket price</p><p className='font-semibold'>${ticketPrice}</p></div>
                  <div className='flex justify-between gap-5'><p className='text-[#6B6B6B] font-semibold'>Seat Choosed</p><p className='font-semibold text-right'>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}</p></div>
                </div>
              </div>
              <div className="flex items-center justify-center text-gray-400 text-sm my-6"><span className="flex-1 h-px bg-gray-300"></span></div>
              <div className='flex justify-between pl-10 pr-10 pb-5'><p className='text-xl font-bold'>Total Payment</p><p className='text-2xl font-bold text-[#1D4ED8]'>${selectedSeats.length * ticketPrice}</p></div>
            </article>
            <article className='mt-10 mb-10 w-full lg:w-auto'>
              <button className='bg-[#1D4ED8] p-4 sm:p-5 px-16 sm:px-35 rounded-lg text-white text-lg sm:text-xl hover:bg-[#1a45b8] transition w-full lg:w-auto' disabled={selectedSeats.length === 0} onClick={handleCheckout}>Checkout now</button>
            </article>
          </section>
        </section>
      </main>
      <Footer />
      <ButtonScrollToTop/>
    </>
  );
}

export default Order;