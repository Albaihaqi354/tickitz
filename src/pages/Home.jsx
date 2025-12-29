import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlaying, fetchUpcoming } from '../redux/slices/movie.slice';

import ShieldIcon from '../assets/Shield.svg';
import VectorIcon from '../assets/Vector.svg';
import BubbleIcon from '../assets/bubble.svg';
import ArrowUpIcon from '../assets/arrow-up.svg';
import ArrowLeftIcon from "../assets/arrow-left.svg";
import ArrowRightIcon from "../assets/arrow-right.svg";
import ButtonScrollToTop from '../components/ButtonScrolToTop';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { nowPlaying, upcoming, loading } = useSelector((state) => state.movie);
  
  const [upcomingIndex, setUpcomingIndex] = React.useState(0);
  
  const movies = nowPlaying.slice(0, 4);
  const allUpcoming = upcoming.slice(0, 8);
  const heroMovies = nowPlaying.slice(0, 4);
  
  const upcomingMovies = allUpcoming.slice(upcomingIndex, upcomingIndex + 4);
  
  const handlePrevUpcoming = () => {
    if (upcomingIndex > 0) {
      setUpcomingIndex(upcomingIndex - 1);
    }
  };
  
  const handleNextUpcoming = () => {
    if (upcomingIndex < allUpcoming.length - 4) {
      setUpcomingIndex(upcomingIndex + 1);
    }
  };

  const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

  const genreList = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };

  useEffect(() => {
    dispatch(fetchNowPlaying());
    dispatch(fetchUpcoming());
  }, [dispatch]);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  if (loading && movies.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-[#1D4ED8]">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <main className='pt-20 pb-16'>
        {/* Hero Section */}
        <section className='px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto'>
          <div className='flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12'>
            <article className='w-full lg:w-1/2 text-center lg:text-left'>
              <p className='text-[#1D4ED8] font-bold text-base sm:text-lg md:text-xl mb-3'>
                MOVIE TICKET PURCHASES #1 IN INDONESIA
              </p>
              <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4'>
                Experience the Magic of Cinema: Book Your Tickets Today
              </h1>
              <p className='text-base sm:text-lg md:text-xl text-[#A0A3BD]'>
                Sign up and get the ticket with a lot of discount
              </p>
            </article>
            
            <article className='w-full lg:w-1/2 flex justify-center lg:justify-end'>
              <div className='grid grid-cols-2 gap-2 w-full max-w-md'>
                {heroMovies.map((movie, index) => (
                  <div 
                    key={movie.id}
                    onClick={() => handleMovieClick(movie.id)}
                    className={`cursor-pointer overflow-hidden transition-transform hover:scale-105 ${
                      index === 0 ? 'h-32 sm:h-40 col-start-1 row-start-1 rounded-tl-2xl' :
                      index === 1 ? 'h-48 sm:h-60 col-start-1 row-start-2 row-span-2 rounded-bl-2xl' :
                      index === 2 ? 'h-48 sm:h-60 col-start-2 row-start-1 row-span-2 rounded-tr-2xl' :
                      'h-32 sm:h-40 col-start-2 row-start-3 rounded-br-2xl'
                    }`}
                  >
                    <img 
                      src={TMDB_IMAGE_BASE + movie.poster_path} 
                      alt={movie.title}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className='mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto'>
          <div className='mb-8 md:mb-12 text-center lg:text-left'>
            <p className='text-lg md:text-xl text-[#1D4ED8] font-semibold mb-3'>
              WHY CHOOSE US
            </p>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>
              Unleashing the Ultimate Movie Experience
            </h2>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12'>
            <div className='text-center md:text-left'>
              <div className='bg-[#1D4ED833] rounded-full w-16 h-16 flex justify-center items-center mb-4 mx-auto md:mx-0'>
                <img src={ShieldIcon} alt="Shield Icon" className='w-8' />
              </div>
              <h3 className='font-bold text-xl mb-2'>Guaranteed</h3>
              <p className='text-base text-[#A0A3BD] leading-relaxed'>
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>
            
            <div className='text-center md:text-left'>
              <div className='bg-[#1D4ED833] rounded-full w-16 h-16 flex justify-center items-center mb-4 mx-auto md:mx-0'>
                <img src={VectorIcon} alt="Vector Icon" className='w-8' />
              </div>
              <h3 className='font-bold text-xl mb-2'>Affordable</h3>
              <p className='text-base text-[#A0A3BD] leading-relaxed'>
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>
            
            <div className='text-center md:text-left'>
              <div className='bg-[#1D4ED833] rounded-full w-16 h-16 flex justify-center items-center mb-4 mx-auto md:mx-0'>
                <img src={BubbleIcon} alt="Bubble Icon" className='w-8' />
              </div>
              <h3 className='font-bold text-xl mb-2'>24/7 Support</h3>
              <p className='text-base text-[#A0A3BD] leading-relaxed'>
                Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.
              </p>
            </div>
          </div>
        </section>

        {/* Movies Section */}
        <section className='mt-16 sm:mt-20 md:mt-24'>
          <div className='text-center px-4 mb-10'>
            <p className='text-[#1D4ED8] text-lg md:text-xl font-bold mb-3'>MOVIES</p>
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mx-auto'>
              Exciting Movies That Should Be Watched Today
            </h2>
          </div>
          
          {/* Mobile Horizontal Scroll */}
          <div className='md:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4'>
            <div className='flex gap-4 pb-4'>
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className='flex-none w-56 cursor-pointer'
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className='relative overflow-hidden rounded-xl'>
                    <img
                      src={TMDB_IMAGE_BASE + movie.poster_path}
                      alt={movie.title}
                      className='w-full h-80 object-cover'
                    />
                  </div>
                  <p className='mt-3 text-lg font-semibold line-clamp-2'>{movie.title}</p>
                  <div className='flex gap-2 mt-2 flex-wrap'>
                    {movie.genre_ids.slice(0, 2).map(id => (
                      <span key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-sm px-3 py-1 rounded-full'>
                        {genreList[id]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto'>
            {movies.map((movie) => (
              <div key={movie.id} className='group'>
                <div className='relative overflow-hidden rounded-xl cursor-pointer' onClick={() => handleMovieClick(movie.id)}>
                  <img
                    src={TMDB_IMAGE_BASE + movie.poster_path}
                    alt={movie.title}
                    className='w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/70 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(movie.id);
                      }}
                      className='text-white border-2 border-white px-12 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-black transition'
                    >
                      Details
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(movie.id);
                      }}
                      className='bg-[#1D4ED8] text-white px-10 py-2.5 rounded-lg font-semibold hover:bg-[#1a45b8] transition'
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
                <p className='mt-4 text-lg font-semibold line-clamp-2'>{movie.title}</p>
                <div className='flex gap-2 mt-2 flex-wrap'>
                  {movie.genre_ids.slice(0, 2).map(id => (
                    <span key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-sm px-3 py-1 rounded-full'>
                      {genreList[id]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => navigate('/movies')} 
            className='hidden md:flex gap-2 justify-center items-center mx-auto mt-10 hover:opacity-80 transition'
          >
            <span className='text-[#1D4ED8] text-xl font-bold'>View All</span>
            <img src={ArrowUpIcon} alt="Arrow Up" className="w-8" />
          </button>
        </section>

        {/* Upcoming Movies Section */}
        <section className='mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 max-w-7xl mx-auto'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-10'>
            <div className='text-center sm:text-left'>
              <p className='text-[#1D4ED8] font-bold text-base md:text-lg'>UPCOMING MOVIES</p>
              <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2'>
                Exciting Movie Coming Soon
              </h2>
            </div>
            
            <div className='hidden sm:flex gap-3'>
              <button 
                onClick={handlePrevUpcoming}
                disabled={upcomingIndex === 0}
                className={`w-14 h-14 rounded-full flex justify-center items-center transition ${
                  upcomingIndex === 0 
                    ? 'bg-[#A0A3BD] opacity-40 cursor-not-allowed' 
                    : 'bg-[#A0A3BD] hover:bg-[#8a8d9f] cursor-pointer'
                }`}
              >
                <img src={ArrowLeftIcon} alt="Arrow Left" className="w-5"/>
              </button>
              <button 
                onClick={handleNextUpcoming}
                disabled={upcomingIndex >= allUpcoming.length - 4}
                className={`w-14 h-14 rounded-full flex justify-center items-center transition ${
                  upcomingIndex >= allUpcoming.length - 4
                    ? 'bg-[#1D4ED8] opacity-40 cursor-not-allowed'
                    : 'bg-[#1D4ED8] hover:bg-[#1a45b8] cursor-pointer'
                }`}
              >
                <img src={ArrowRightIcon} alt="Arrow Right" className="w-5"/>
              </button>
            </div>
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className='md:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
            <div className='flex gap-4 pb-4'>
              {upcomingMovies.map((movie) => (
                <div key={movie.id} className='flex-none w-56 group'>
                  <div className='relative overflow-hidden rounded-xl cursor-pointer' onClick={() => handleMovieClick(movie.id)}>
                    <img
                      src={TMDB_IMAGE_BASE + movie.poster_path}
                      alt={movie.title}
                      className='w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-black/70 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMovieClick(movie.id);
                        }}
                        className='text-white border-2 border-white px-12 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-black transition'
                      >
                        Details
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMovieClick(movie.id);
                        }}
                        className='bg-[#1D4ED8] text-white px-10 py-2.5 rounded-lg font-semibold hover:bg-[#1a45b8] transition'
                      >
                        Buy Ticket
                      </button>
                    </div>
                  </div>
                  <p className='mt-3 text-lg font-semibold line-clamp-2'>{movie.title}</p>
                  <p className='mt-1 text-sm font-bold text-[#1D4ED8]'>
                    {new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long'})}
                  </p>
                  <div className='flex gap-2 mt-2 flex-wrap'>
                    {movie.genre_ids.slice(0, 2).map(id => (
                      <span key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-sm px-3 py-1 rounded-full'>
                        {genreList[id]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Grid */}
          <div className='hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500'>
            {upcomingMovies.map((movie) => (
              <div key={movie.id} className='group'>
                <div className='relative overflow-hidden rounded-xl cursor-pointer' onClick={() => handleMovieClick(movie.id)}>
                  <img
                    src={TMDB_IMAGE_BASE + movie.poster_path}
                    alt={movie.title}
                    className='w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105'
                  />
                  <div className='absolute inset-0 bg-black/70 flex flex-col justify-center items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(movie.id);
                      }}
                      className='text-white border-2 border-white px-12 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-black transition'
                    >
                      Details
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(movie.id);
                      }}
                      className='bg-[#1D4ED8] text-white px-10 py-2.5 rounded-lg font-semibold hover:bg-[#1a45b8] transition'
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
                <p className='mt-4 text-lg font-semibold line-clamp-2'>{movie.title}</p>
                <p className='mt-2 text-sm font-bold text-[#1D4ED8]'>
                  {new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long'})}
                </p>
                <div className='flex gap-2 mt-2 flex-wrap'>
                  {movie.genre_ids.slice(0, 2).map(id => (
                    <span key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-sm px-3 py-1 rounded-full'>
                      {genreList[id]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <ButtonScrollToTop/>
    </>
  );
}

export default Home;