import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail, fetchMovieCredits } from '../redux/slices/movie.slice';
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
  
  const { detail: movie, credits, loading } = useSelector((state) => state.movie);
  
  const [selectedCinema, setSelectedCinema] = useState(null);
  
  const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;
  const backdropBase = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    dispatch(fetchMovieDetail(id));
    dispatch(fetchMovieCredits(id));
  }, [id, dispatch]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleCinemaClick = (cinemaId) => {
    setSelectedCinema(cinemaId);
  };

  const handleBookNow = () => {
    navigate(`/movies/${id}/order`);
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
              src={movie.backdrop_path ? backdropBase + movie.backdrop_path : TMDB_IMAGE_BASE + movie.poster_path} 
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
                src={movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/400x600?text=No+Image'} 
                alt={movie.title}
                className="w-48 sm:w-56 md:w-64 lg:w-56 xl:w-64 h-auto rounded-xl object-cover shadow-lg"
              />
            </div>

            <div className="flex-1 mt-2 lg:mt-32">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center lg:text-left">{movie.title}</h1>
              
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-3 justify-center lg:justify-start">
                {movie.genres && movie.genres.slice(0, 3).map(genre => (
                  <span key={genre.id} className="bg-[#A0A3BD1A] text-[#A0A3BD] text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Release date</p>
                  <p className="text-sm sm:text-base mt-1">{movie.release_date ? formatDate(movie.release_date) : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Directed by</p>
                  <p className="text-sm sm:text-base mt-1">
                    {credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Duration</p>
                  <p className="text-sm sm:text-base mt-1">{movie.runtime ? formatDuration(movie.runtime) : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-xs sm:text-sm">Casts</p>
                  <p className="text-sm sm:text-base mt-1">
                    {credits?.cast?.slice(0, 3).map(actor => actor.name).join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Synopsis</h2>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base text-[#A0A3BD] leading-6 sm:leading-7">
              {movie.overview || 'No synopsis available.'}
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8 bg-gray-50">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Book Tickets</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div>
              <label className="hidden text-sm sm:text-base font-semibold sm:block mb-2">Choose Date</label>
              <div className="relative">
                <select className="w-full bg-[#EFF0F6] cursor-pointer h-10 sm:h-11 rounded-lg pl-9 sm:pl-10 pr-4 text-sm sm:text-base outline-none appearance-none">
                  <option value="">Select Date</option>
                  <option value="">Today</option>
                  <option value="">Tomorrow</option>
                  <option value="">Next Week</option>
                </select>
                <svg 
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <svg 
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className='hidden sm:block'>
              <label className="text-sm sm:text-base font-semibold block mb-2">Choose Time</label>
              <div className="relative">
                <select className="w-full bg-[#EFF0F6] cursor-pointer h-10 sm:h-11 rounded-lg pl-9 sm:pl-10 pr-4 text-sm sm:text-base outline-none appearance-none">
                  <option value="">Select Time</option>
                  <option value="">08:30 AM</option>
                  <option value="">12:30 PM</option>
                  <option value="">03:30 PM</option>
                  <option value="">07:30 PM</option>
                </select>
                <svg 
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg 
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="hidden text-sm sm:text-base font-semibold sm:block mb-2">Choose Location</label>
              <div className="relative">
                <select className="w-full bg-[#EFF0F6] h-10 cursor-pointer sm:h-11 rounded-lg pl-9 sm:pl-10 pr-4 text-sm sm:text-base outline-none appearance-none">
                  <option value="">Select Location</option>
                  <option value="">Jakarta</option>
                  <option value="">Bandung</option>
                  <option value="">Surabaya</option>
                  <option value="">Bogor</option>
                </select>
                <svg 
                  className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg 
                  className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div className="flex items-end">
              <button className="bg-[#1D4ED8] hover:bg-[#1a45b8] cursor-pointer text-white w-full h-10 sm:h-11 rounded-lg transition-colors text-sm sm:text-base font-medium">
                Filter
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold">Choose Cinema</h2>
            <span className="text-sm sm:text-base text-[#8692A6]">39 Results</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div 
              onClick={() => handleCinemaClick(0)}
              className={`flex items-center justify-center border-2 rounded-lg p-3 sm:p-4 md:p-5 transition-colors cursor-pointer ${
                selectedCinema === 0 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={EbvLogo} 
                alt="EBV Cinema" 
                className={`w-16 h-auto sm:w-20 md:w-24 ${selectedCinema === 0 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            
            <div 
              onClick={() => handleCinemaClick(1)}
              className={`flex items-center justify-center border-2 rounded-lg p-3 sm:p-4 md:p-5 transition-colors cursor-pointer ${
                selectedCinema === 1 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={HiflixLogo} 
                alt="Hiflix Cinema" 
                className={`w-16 h-auto sm:w-20 md:w-24 ${selectedCinema === 1 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            
            <div 
              onClick={() => handleCinemaClick(2)}
              className={`flex items-center justify-center border-2 rounded-lg p-3 sm:p-4 md:p-5 transition-colors cursor-pointer ${
                selectedCinema === 2 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={CineOneLogo} 
                alt="CineOne Cinema" 
                className={`w-16 h-auto sm:w-20 md:w-24 ${selectedCinema === 2 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            
            <div 
              onClick={() => handleCinemaClick(3)}
              className={`flex items-center justify-center border-2 rounded-lg p-3 sm:p-4 md:p-5 transition-colors cursor-pointer ${
                selectedCinema === 3 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={EbvLogo} 
                alt="EBV Cinema" 
                className={`w-16 h-auto sm:w-20 md:w-24 ${selectedCinema === 3 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
          </div>

          <div className="flex justify-center gap-2 mb-4 sm:mb-6">
            <button className="bg-[#1D4ED8] text-white w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex justify-center items-center hover:bg-[#1a45b8] transition-colors text-sm">
              1
            </button>
            <button className="bg-[#F9FAFB] text-[#A0A3BD] w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex justify-center items-center hover:bg-[#1D4ED8] hover:text-white transition-colors text-sm">
              2
            </button>
            <button className="bg-[#F9FAFB] text-[#A0A3BD] w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex justify-center items-center hover:bg-[#1D4ED8] hover:text-white transition-colors text-sm">
              3
            </button>
            <button className="bg-[#F9FAFB] text-[#A0A3BD] w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex justify-center items-center hover:bg-[#1D4ED8] hover:text-white transition-colors text-sm">
              4
            </button>
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