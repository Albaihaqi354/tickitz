import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail } from '../redux/slices/movie.slice';
import { fetchSeats, fetchScheduleDetail } from '../redux/slices/order.slice';
import { getImageUrl } from '../api/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ButtonScrollToTop from '../components/ButtonScrolToTop';
import { useLocation } from 'react-router-dom';

function Order() {
  const { id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const scheduleId = query.get('schedule_id');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { detail: movie, loading: movieLoading } = useSelector((state) => state.movie);
  const { activeSchedule: schedule, seats, loading: orderLoading } = useSelector((state) => state.order);

  const loading = movieLoading || orderLoading;

  const [selectedSeats, setSelectedSeats] = useState([]);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    if (id) {
      dispatch(fetchMovieDetail(id));
    }
    if (id && scheduleId) {
      dispatch(fetchScheduleDetail({ movieId: id, scheduleId }));
      dispatch(fetchSeats(scheduleId));
    }
  }, [id, scheduleId, dispatch]);

  const handleSeatClick = (seat) => {
    setSelectedSeats(prev => {
      if (prev.find(s => s.seat_id === seat.seat_id)) {
        return prev.filter(s => s.seat_id !== seat.seat_id);
      } else {
        return [...prev, seat];
      }
    });
  };

  const ticketPrice = schedule?.price || 0;
  const showDate = schedule?.show_date ? new Date(schedule.show_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '-';
  const showTime = schedule?.show_time ? new Date(schedule.show_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '-';

  const handleCheckout = () => {
    if (selectedSeats.length === 0) {
      return;
    }

    const orderData = {
      movieId: id,
      scheduleId,
      movie,
      schedule,
      selectedSeats,
      totalPrice: selectedSeats.length * ticketPrice
    };

    navigate(`/movies/${id}/order/payment`, { state: orderData });
  };

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const leftNums = [1, 2, 3, 4, 5, 6, 7];
  const rightNums = [8, 9, 10, 11, 12, 13, 14];

  const getSeatByCoord = (row, num) => {
    return seats?.find(s => s.row_letter === row && s.seat_number === num);
  };

  const getSeatColor = (seat) => {
    if (!seat) return 'bg-[#D6D8E7] cursor-not-allowed opacity-50';
    if (selectedSeats.find(s => s.seat_id === seat.seat_id)) return 'bg-[#1D4ED8] cursor-pointer shadow-[0_0_10px_rgba(29,78,216,0.5)]';
    if (seat.status === 'sold') return 'bg-[#6E7191] cursor-not-allowed';
    if (seat.seat_type?.toLowerCase().includes('love')) return 'bg-[#F589D7] cursor-pointer';
    return 'bg-[#D6D8E7] cursor-pointer hover:bg-[#A0A3BD]';
  };

  if (loading && !movie && seats.length === 0) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-2xl text-[#1D4ED8] animate-pulse">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className='bg-gray-50 min-h-screen pb-20'>
        <section className='pt-10'>
          <div className="hidden md:flex justify-center items-center gap-5 text-center mb-10">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 flex items-center justify-center bg-green-500 text-white rounded-full font-bold shadow-md">✓</div>
              <p className="text-xs mt-2 font-medium text-gray-500 uppercase tracking-wider">Date & Time</p>
            </div>
            <div className="border-t-2 border-dashed border-gray-300 w-16 mb-6"></div>
            <div className="flex flex-col items-center">
              <p className="w-10 h-10 flex items-center justify-center bg-[#1D4ED8] text-white rounded-full font-bold shadow-lg shadow-blue-200">2</p>
              <p className="text-xs mt-2 font-bold text-[#1D4ED8] uppercase tracking-wider">Seat Selection</p>
            </div>
            <div className="border-t-2 border-dashed border-gray-300 w-16 mb-6"></div>
            <div className="flex flex-col items-center">
              <p className="w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 text-gray-400 rounded-full font-bold">3</p>
              <p className="text-xs mt-2 font-medium text-gray-400 uppercase tracking-wider">Payment</p>
            </div>
          </div>
        </section>
        
        <section className='container mx-auto px-4 lg:px-10 flex flex-col lg:flex-row gap-8 justify-center items-start'>
          <article className='w-full lg:w-[750px] space-y-6'>
            {/* Movie Info Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
               <div className='p-5 flex flex-col sm:flex-row gap-6'>
                  <div className='w-full sm:w-48 h-64 shrink-0'>
                    <img 
                      src={getImageUrl(movie?.poster_url, 'https://via.placeholder.com/400x600?text=No+Poster')} 
                      alt={movie?.title} 
                      className='w-full h-full rounded-xl object-cover shadow-md' 
                    />
                  </div>
                  <div className='flex-1 flex flex-col justify-between py-2'>
                    <div>
                      <h1 className='text-2xl font-bold text-[#1D4ED8] mb-3'>{movie?.title || 'Loading...'}</h1>
                      <div className='flex gap-2 flex-wrap mb-4'>
                        {movie?.genres?.split(', ').map((genre, idx) => (
                          <span key={idx} className='bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold'>
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className='flex items-center justify-between border-t border-gray-50 pt-4'>
                      <div className='space-y-1'>
                        <p className='text-xs text-gray-400 uppercase font-bold tracking-widest'>Showtime</p>
                        <p className='font-bold text-gray-700'>{showTime}</p>
                      </div>
                      <button 
                        onClick={() => navigate(-1)}
                        className='bg-gray-100 text-gray-600 px-5 py-2 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm'
                      >
                        Change
                      </button>
                    </div>
                  </div>
               </div>
            </div>

            {/* Seat Selection Card */}
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
              <h2 className='text-xl font-bold text-gray-800 mb-8'>Choose Your Seat</h2>
              
              <div className='flex flex-col items-center'>
                <div className='w-full max-w-lg h-2 bg-gray-200 rounded-full mb-2 shadow-inner'></div>
                <p className='text-[10px] font-bold text-gray-300 uppercase tracking-[0.5em] mb-12'>Screen</p>
                
                <div className='overflow-x-auto w-full flex justify-center'>
                  <div className='flex gap-8 lg:gap-16 min-w-max px-4'>
                    {/* Left Block */}
                    <div className='grid grid-cols-8 gap-2 transition-all'>
                      {rows.map(row => (
                        <React.Fragment key={row}>
                          <span className='flex items-center justify-center text-[10px] font-bold text-gray-400'>{row}</span>
                          {leftNums.map(num => {
                            const seat = getSeatByCoord(row, num);
                            return (
                              <button 
                                key={`${row}${num}`} 
                                disabled={!seat || seat.status === 'sold'}
                                onClick={() => handleSeatClick(seat)} 
                                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md transition-all duration-200 ${getSeatColor(seat)}`}
                              />
                            );
                          })}
                        </React.Fragment>
                      ))}
                      <span></span>
                      {leftNums.map(num => (<span key={num} className='text-center text-[10px] font-bold text-gray-300'>{num}</span>))}
                    </div>

                    {/* Right Block */}
                    <div className='grid grid-cols-7 gap-2'>
                        {rows.map(row => (
                          <React.Fragment key={row}>
                            {rightNums.map(num => {
                              const seat = getSeatByCoord(row, num);
                              return (
                                <button 
                                  key={`${row}${num}`} 
                                  disabled={!seat || seat.status === 'sold'}
                                  onClick={() => handleSeatClick(seat)} 
                                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md transition-all duration-200 ${getSeatColor(seat)}`}
                                />
                              );
                            })}
                          </React.Fragment>
                        ))}
                        {rightNums.map(num => (<span key={num} className='text-center text-[10px] font-bold text-gray-300'>{num}</span>))}
                    </div>
                  </div>
                </div>

                <div className='mt-12 w-full max-w-md'>
                  <p className='text-sm font-bold text-gray-800 mb-6'>Seating Legend</p>
                  <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 bg-[#D6D8E7] rounded-sm'></div>
                      <span className='text-[10px] font-medium text-gray-500'>Available</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 bg-[#1D4ED8] rounded-sm'></div>
                      <span className='text-[10px] font-medium text-gray-500'>Selected</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 bg-[#F589D7] rounded-sm'></div>
                      <span className='text-[10px] font-medium text-gray-500'>Love Nest</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className='w-4 h-4 bg-[#6E7191] rounded-sm'></div>
                      <span className='text-[10px] font-medium text-gray-500'>Sold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Checkout Panel */}
          <aside className='w-full lg:w-[400px] h-fit sticky top-24'>
            <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
               <div className='p-8'>
                  <div className='flex justify-center mb-6 h-12'>
                    <img 
                      src={getImageUrl(schedule?.cinema_logo, 'https://via.placeholder.com/200x100?text=Cinema')} 
                      alt={schedule?.cinema_name} 
                      className="h-full object-contain" 
                    />
                  </div>
                  <h3 className='text-xl font-bold text-gray-800 text-center mb-8'>{schedule?.cinema_name || 'Cinema'}</h3>
                  
                  <div className='space-y-4 text-sm'>
                    <div className='flex justify-between items-start gap-4'>
                      <p className='text-gray-400 font-medium'>Movie</p>
                      <p className='font-bold text-gray-700 text-right'>{movie?.title || 'N/A'}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-gray-400 font-medium'>{showDate}</p>
                      <p className='font-bold text-gray-700'>{showTime}</p>
                    </div>
                    <div className='flex justify-between items-center'>
                      <p className='text-gray-400 font-medium'>Price / ticket</p>
                      <p className='font-bold text-gray-700'>Rp{ticketPrice.toLocaleString('id-ID')}</p>
                    </div>
                    <div className='flex justify-between items-start gap-4 border-t border-gray-50 pt-4'>
                      <p className='text-gray-400 font-medium'>Selected Seats</p>
                      <p className='font-bold text-[#1D4ED8] text-right'>
                        {selectedSeats.length > 0 
                          ? selectedSeats.map(s => `${s.row_letter}${s.seat_number}`).join(', ') 
                          : 'None'}
                      </p>
                    </div>
                  </div>
               </div>
               
               <div className='bg-[#F9FAFB] p-8 border-t border-gray-50'>
                  <div className='flex justify-between items-center mb-8'>
                    <p className='text-gray-800 font-bold'>Total Payment</p>
                    <p className='text-2xl font-black text-[#1D4ED8]'>
                      Rp{(selectedSeats.length * ticketPrice).toLocaleString('id-ID')}
                    </p>
                  </div>
                  <button 
                    className={`w-full py-4 rounded-xl text-lg font-bold transition-all shadow-lg ${
                      selectedSeats.length === 0 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-[#1D4ED8] text-white hover:bg-[#1a45b8] shadow-blue-100 hover:shadow-blue-200'
                    }`} 
                    disabled={selectedSeats.length === 0} 
                    onClick={handleCheckout}
                  >
                    Checkout now
                  </button>
               </div>
            </div>
          </aside>
        </section>
      </main>
      <Footer />
      <ButtonScrollToTop/>
    </>
  );
}

export default Order;
