import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail, fetchMovieCredits } from '../redux/slices/movie.slice';
import Footer from '../components/Footer';
import Header from '../components/Header';
import EbvLogo from '../assets/ebv.svg';
import CineOneLogo from '../assets/CineOne21.svg';
import HiflixLogo from '../assets/hiflix.svg';

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { detail: movie, credits, loading } = useSelector((state) => state.movie);
  
  const [selectedCinema, setSelectedCinema] = useState(1);
  
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
          <div className="text-2xl text-[#1D4ED8]">Loading...</div>
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
          <div className="text-2xl text-red-500">Movie not found</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Mulish', sans-serif;
        }
      `}</style>

      <main>
        <section className="relative -z-20">
          <img 
            src={movie.backdrop_path ? backdropBase + movie.backdrop_path : TMDB_IMAGE_BASE + movie.poster_path} 
            alt={movie.title}
            className="w-full h-170 sm:h-80 md:h-96 lg:h-125 object-cover"
          />
          <div className="absolute inset-0 bg-black/55 flex items-center justify-start px-5 sm:px-10 md:px-15 lg:pl-20" />
        </section>

        <section className="-mt-90 sm:-mt-55 px-5 sm:px-10 md:px-15 lg:px-30 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className='flex justify-center'>
              <img 
                src={movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/400x600?text=No+Image'} 
                alt={movie.title}
                className="w-100 sm:w-80 h-full rounded-xl object-cover shadow-lg"
              />
            </div>

            <div className="flex-1 lg:mt-55">
              <h1 className="text-3xl text-center lg:text-left md:text-4xl font-semibold">{movie.title}</h1>
              
              <div className="flex gap-3 mt-4 flex-wrap justify-center lg:justify-start">
                {movie.genres && movie.genres.slice(0, 3).map(genre => (
                  <span key={genre.id} className="bg-[#A0A3BD1A] text-[#A0A3BD] text-lg px-4 py-1 rounded-full">
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-8 mt-8">
                <div>
                  <p className="text-[#8692A6] text-lg">Release date</p>
                  <p className="text-xl mt-1">{movie.release_date ? formatDate(movie.release_date) : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-lg">Directed by</p>
                  <p className="text-xl mt-1">
                    {credits?.crew?.find(person => person.job === 'Director')?.name || 'N/A'}
                  </p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-lg">Duration</p>
                  <p className="text-xl mt-1">{movie.runtime ? formatDuration(movie.runtime) : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-lg">Casts</p>
                  <p className="text-xl mt-1">
                    {credits?.cast?.slice(0, 3).map(actor => actor.name).join(', ') || 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-4xl">
            <h2 className="text-2xl font-bold">Synopsis</h2>
            <p className="mt-4 text-lg text-[#A0A3BD] leading-8">
              {movie.overview || 'No synopsis available.'}
            </p>
          </div>
        </section>

        <section className="px-5 sm:px-10 md:px-15 lg:px-30 py-10">
          <h2 className="text-3xl font-semibold">Book Tickets</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div>
              <label className="text-xl font-semibold block mb-3">Choose Date</label>
              <div className="relative">
                <select className="w-full bg-[#EFF0F6] h-13 rounded-lg pl-12 pr-5 text-lg outline-none appearance-none">
                  <option value="">Select Date</option>
                  <option value="">Today</option>
                  <option value="">Tomorrow</option>
                  <option value="">Next Week</option>
                </select>
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <svg 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="text-xl font-semibold block mb-3">Choose Time</label>
              <div className="relative">
                <select className="w-full bg-[#EFF0F6] h-13 rounded-lg pl-12 pr-5 text-lg outline-none appearance-none">
                  <option value="">Select Time</option>
                  <option value="">08:30 AM</option>
                  <option value="">12:30 PM</option>
                  <option value="">03:30 PM</option>
                  <option value="">07:30 PM</option>
                </select>
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <svg 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className="text-xl font-semibold block mb-3">Choose Location</label>
              <div className="relative">
                <select className="w-full bg-[#EFF0F6] h-13 rounded-lg pl-12 pr-5 text-lg outline-none appearance-none">
                  <option value="">Select Location</option>
                  <option value="">Jakarta</option>
                  <option value="">Bandung</option>
                  <option value="">Surabaya</option>
                  <option value="">Bogor</option>
                </select>
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <svg 
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          <button className="bg-[#1D4ED8] hover:bg-[#1a45b8] mt-10 text-white w-full sm:w-auto px-12 h-13 rounded-lg transition-colors text-lg font-medium">
            Filter
          </button>
          </div>

        </section>

        <section className="px-5 sm:px-10 md:px-15 lg:px-30 py-10">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-semibold">Choose Cinema</h2>
            <span className="text-xl text-[#8692A6]">39 Results</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <div 
              onClick={() => handleCinemaClick(0)}
              className={`flex items-center justify-center border-2 rounded-lg p-8 transition-colors cursor-pointer ${
                selectedCinema === 0 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={EbvLogo} 
                alt="EBV Cinema" 
                className={`w-32 h-auto ${selectedCinema === 0 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            
            <div 
              onClick={() => handleCinemaClick(1)}
              className={`flex items-center justify-center border-2 rounded-lg p-8 transition-colors cursor-pointer ${
                selectedCinema === 1 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={HiflixLogo} 
                alt="Hiflix Cinema" 
                className={`w-32 h-auto ${selectedCinema === 1 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            
            <div 
              onClick={() => handleCinemaClick(2)}
              className={`flex items-center justify-center border-2 rounded-lg p-8 transition-colors cursor-pointer ${
                selectedCinema === 2 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={CineOneLogo} 
                alt="CineOne Cinema" 
                className={`w-32 h-auto ${selectedCinema === 2 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
            
            <div 
              onClick={() => handleCinemaClick(3)}
              className={`flex items-center justify-center border-2 rounded-lg p-8 transition-colors cursor-pointer ${
                selectedCinema === 3 
                  ? 'bg-[#1D4ED8] border-[#1D4ED8]' 
                  : 'border-[#DEDEDE] hover:border-[#1D4ED8]'
              }`}
            >
              <img 
                src={EbvLogo} 
                alt="EBV Cinema" 
                className={`w-32 h-auto ${selectedCinema === 3 ? 'brightness-0 invert' : ''}`} 
              />
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            <button className="bg-[#1D4ED8] text-white w-10 h-10 rounded-lg flex justify-center items-center hover:bg-[#1a45b8] transition-colors">
              1
            </button>
            <button className="bg-[#F9FAFB] text-[#A0A3BD] w-10 h-10 rounded-lg flex justify-center items-center hover:bg-[#1D4ED8] hover:text-white transition-colors">
              2
            </button>
            <button className="bg-[#F9FAFB] text-[#A0A3BD] w-10 h-10 rounded-lg flex justify-center items-center hover:bg-[#1D4ED8] hover:text-white transition-colors">
              3
            </button>
            <button className="bg-[#F9FAFB] text-[#A0A3BD] w-10 h-10 rounded-lg flex justify-center items-center hover:bg-[#1D4ED8] hover:text-white transition-colors">
              4
            </button>
          </div>

          <div className="text-center pb-10">
            <button 
              onClick={handleBookNow}
              className="bg-[#1D4ED8] hover:bg-[#1a45b8] text-white px-16 py-4 rounded-lg transition-colors text-lg font-medium"
            >
              Book Now
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Details;