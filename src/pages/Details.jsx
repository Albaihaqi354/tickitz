import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail } from '../redux/slices/movie.slice';
import { fetchSchedules } from '../redux/slices/order.slice';
import { getImageUrl } from '../api/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import EbvLogo from '../assets/ebv.svg';
import CineOneLogo from '../assets/CineOne21.svg';
import HiflixLogo from '../assets/hiflix.svg';
import ButtonScrollToTop from '../components/ButtonScrolToTop';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { detail: movie, loading: movieLoading } = useSelector((state) => state.movie);
  const { schedules, loading: orderLoading } = useSelector((state) => state.order);
  
  const loading = movieLoading || orderLoading;
  
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;
  const backdropBase = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    dispatch(fetchMovieDetail(id));
    dispatch(fetchSchedules({ movieId: id }));
  }, [id, dispatch]);

  const uniqueCities = [...new Set(schedules.map(s => s.cinema_city))];
  const uniqueDates = [...new Set(schedules.map(s => new Date(s.show_date).toISOString().split('T')[0]))];
  const uniqueTimes = [...new Set(schedules
    .filter(s => !selectedDate || new Date(s.show_date).toISOString().split('T')[0] === selectedDate)
    .map(s => new Date(s.show_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
  )];
  const availableCinemas = schedules.reduce((acc, s) => {
    if (!acc.find(c => c.id === s.cinema_id)) {
      acc.push({ id: s.cinema_id, name: s.cinema_name, logo: s.cinema_logo });
    }
    return acc;
  }, []);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
  };

  const handleCinemaClick = (cinemaId) => {
    setSelectedCinema(cinemaId);
  };

  const handleBookNow = () => {
    if (!selectedCinema || !selectedDate || !selectedTime) {
      alert('Please select cinema, date, and time first');
      return;
    }

    const selectedSchedule = schedules.find(s => 
      s.cinema_id === selectedCinema &&
      new Date(s.show_date).toISOString().split('T')[0] === selectedDate &&
      new Date(s.show_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) === selectedTime
    );

    if (selectedSchedule) {
      navigate(`/movies/${id}/order?schedule_id=${selectedSchedule.id}`);
    } else {
      alert('Schedule not found for the selected options');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl sm:text-2xl text-[#1D4ED8]">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!movie) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl sm:text-2xl text-red-500">Movie not found</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <section className="relative -z-20">
          <div className="h-100 sm:h-full md:aspect-16/7 lg:aspect-21/9">
            <img 
              src={movie.backdrop_path ? backdropBase + movie.backdrop_path : getImageUrl(movie.backdrop_url || movie.poster_url)} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent md:bg-linear-to-r md:from-black md:via-black/70 md:to-transparent" />
        </section>

        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 -mt-40 sm:-mt-48 lg:-mt-40 relative z-10">
          <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
            <div className='flex justify-center lg:justify-start'>
              <img 
                src={movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : getImageUrl(movie.poster_url, 'https://via.placeholder.com/400x600?text=No+Image')} 
                alt={movie.title}
                className="w-48 sm:w-56 md:w-64 lg:w-56 xl:w-64 h-auto rounded-xl object-cover shadow-lg"
              />
            </div>

            <div className="flex-1 mt-2 lg:mt-32">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center lg:text-left">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-3 justify-center lg:justify-start">
                {movie.genres && (typeof movie.genres === 'string' ? movie.genres.split(', ') : movie.genres).slice(0, 3).map((genre) => {
                  const name = typeof genre === 'string' ? genre : genre.name;
                  const id = typeof genre === 'string' ? genre : genre.id;
                  return (
                    <span key={id} className="bg-[#A0A3BD1A] text-[#A0A3BD] text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                      {name}
                    </span>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Release date</p>
                  <p className="text-sm sm:text-base mt-1 font-semibold">
                    {movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Directed by</p>
                  <p className="text-sm sm:text-base mt-1 font-semibold">{movie.director || 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Duration</p>
                  <p className="text-sm sm:text-base mt-1 font-semibold">{movie.duration ? formatDuration(movie.duration) : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Casts</p>
                  <p className="text-sm sm:text-base mt-1 font-semibold">{movie.cast || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Synopsis</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#4E4B66] leading-6 sm:leading-7">
              {movie.synopsis || 'No synopsis available.'}
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 bg-gray-50">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Book Tickets</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div>
              <label className="hidden text-sm sm:text-base font-semibold sm:block mb-2">Choose Date</label>
              <div className="relative">
                <select 
                  className="w-full bg-[#EFF0F6] cursor-pointer h-10 sm:h-11 rounded-lg px-4 text-sm sm:text-base outline-none appearance-none"
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Select Date</option>
                  {uniqueDates.map(date => (
                    <option key={date} value={date}>{new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</option>
                  ))}
                </select>
                <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className='hidden sm:block'>
              <label className="text-sm sm:text-base font-semibold block mb-2">Choose Time</label>
              <div className="relative">
                <select 
                  className="w-full bg-[#EFF0F6] cursor-pointer h-10 sm:h-11 rounded-lg px-4 text-sm sm:text-base outline-none appearance-none"
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select Time</option>
                  {uniqueTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="hidden text-sm sm:text-base font-semibold sm:block mb-2">Choose Location</label>
              <div className="relative">
                <select 
                  className="w-full bg-[#EFF0F6] h-10 cursor-pointer sm:h-11 rounded-lg px-4 text-sm sm:text-base outline-none appearance-none"
                  onChange={(e) => {
                    setSelectedCity(e.target.value);
                    dispatch(fetchSchedules({ movieId: id, city: e.target.value }));
                  }}
                >
                  <option value="">Select Location</option>
                  {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <svg className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={() => dispatch(fetchSchedules({ movieId: id, city: selectedCity }))}
                className="bg-[#1D4ED8] hover:bg-[#1a45b8] cursor-pointer text-white w-full h-10 sm:h-11 rounded-lg transition-colors text-sm sm:text-base font-medium"
              >
                Filter
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold">Choose Cinema</h2>
            <span className="text-sm sm:text-base text-[#8692A6]">{schedules.length} Results</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            {availableCinemas.length > 0 ? (
              availableCinemas.map((cinema) => (
                <div 
                  key={cinema.id}
                  onClick={() => handleCinemaClick(cinema.id)}
                  className={`flex items-center justify-center border-2 rounded-lg p-3 sm:p-4 md:p-5 transition-colors cursor-pointer ${
                    selectedCinema === cinema.id ? 'bg-[#1D4ED8] border-[#1D4ED8]' : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
                  }`}
                >
                  <img 
                    src={cinema.name.includes('EBV') ? EbvLogo : cinema.name.includes('Hiflix') ? HiflixLogo : CineOneLogo} 
                    alt={cinema.name} 
                    className={`w-16 h-auto sm:w-20 md:w-24 ${selectedCinema === cinema.id ? 'brightness-0 invert' : ''}`} 
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-4 text-gray-400">No cinemas available for this movie.</div>
            )}
          </div>

          <div className="flex justify-center gap-2 mb-4 sm:mb-6">
            {[1, 2, 3, 4].map(page => (
              <button key={page} className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex justify-center items-center transition-colors text-sm ${page === 1 ? 'bg-[#1D4ED8] text-white' : 'bg-[#F9FAFB] text-[#A0A3BD] hover:bg-[#1D4ED8] hover:text-white'}`}>
                {page}
              </button>
            ))}
          </div>

          <div className="text-center pb-4 sm:pb-6">
            <button 
              onClick={handleBookNow}
              className="bg-[#1D4ED8] cursor-pointer hover:bg-[#1a45b8] text-white px-6 sm:px-10 md:px-12 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base font-medium"
            >
              Book Now
            </button>
          </div>
        </section>
      </main>
      
      <ButtonScrollToTop/>
      <Footer />
    </>
  );
}

export default Details;