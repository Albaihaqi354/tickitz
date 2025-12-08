import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import FooterTop from '../components/FooterTop.jsx';

import ShieldIcon from '../assets/Shield.svg';
import VectorIcon from '../assets/Vector.svg';
import BubbleIcon from '../assets/bubble.svg';
import ArrowUpIcon from '../assets/arrow-up.svg';
import ArrowLeftIcon from "../assets/arrow-left.svg";
import ArrowRightIcon from "../assets/arrow-right.svg";

function Home() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [heroMovies, setHeroMovies] = useState([]);

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

  const imageBase = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mjk1ZDJhYzg5NDE1MDdmNTFhNDMyNjUwMWU0MjBiYyIsIm5iZiI6MTc2NDM4MzY0Mi43MTQsInN1YiI6IjY5MmE1YjlhZTYyNTU3OTZhZjRjNDAwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGseaIHAZhc8l66sp3TUwoWXTLl7qyL_558oEkZgi6I"
      }
    })
      .then(res => res.json())
      .then(data => {
        setMovies(data.results.slice(0, 4));
        setHeroMovies(data.results.slice(0, 4));
      })
      .catch(err => console.error(err));

    fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mjk1ZDJhYzg5NDE1MDdmNTFhNDMyNjUwMWU0MjBiYyIsIm5iZiI6MTc2NDM4MzY0Mi43MTQsInN1YiI6IjY5MmE1YjlhZTYyNTU3OTZhZjRjNDAwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGseaIHAZhc8l66sp3TUwoWXTLl7qyL_558oEkZgi6I"
      }
    })
      .then(res => res.json())
      .then(data => {
        setUpcomingMovies(data.results.slice(0, 4));
      })
      .catch(err => console.error(err));
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

    window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
    });

  return (
    <>
      <Header />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Mulish:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Mulish', sans-serif;
        }

      `}</style>
      <main className='mt-15 md:mt-15'>
        <section className='flex flex-col lg:flex-row justify-between items-center mx-5 sm:mx-10 md:mx-20 lg:mx-30 gap-10 lg:gap-5'>
          <article className='w-full lg:w-3xl text-center lg:text-left'>
            <p className='text-[#1D4ED8] font-bold text-xl sm:text-lg md:text-xl mb-3 md:mb-5'>MOVIE TICKET PURCHASES #1 IN INDONESIA</p>
            <p className='text-4xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight md:leading-22 mb-3 md:mb-5'>Experience the Magic of Cinema: Book Your Tickets Today</p>
            <p className='text-base text-[20px] md:text-[20px] text-[#A0A3BD]'>Sign up and get the ticket with a lot of discount</p>
          </article>
          <article className='w-full lg:w-auto flex justify-center'>
            <div className='grid grid-cols-2 gap-2'>
              {heroMovies.map((movie, index) => (
                <div 
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  className={`cursor-pointer overflow-hidden transition-transform hover:scale-105 ${
                    index === 0 ? 'w-40 h-32 sm:w-50 sm:h-40 md:w-60 md:h-50 col-start-1 col-end-2 row-start-1 row-end-2 rounded-tl-lg rounded-tr-lg' :
                    index === 1 ? 'w-40 h-48 sm:w-50 sm:h-60 md:w-60 md:h-75 col-start-1 col-end-2 row-start-2 row-end-4 rounded-bl-lg rounded-br-lg' :
                    index === 2 ? 'w-40 h-48 sm:w-50 sm:h-60 md:w-60 md:h-75 col-start-2 col-end-3 row-start-1 row-end-3 rounded-tl-lg rounded-tr-lg' :
                    'w-40 h-32 sm:w-50 sm:h-40 md:w-60 md:h-50 col-start-2 col-end-3 row-start-3 row-end-4 rounded-bl-lg rounded-br-lg'
                  }`}
                >
                  <img 
                    src={imageBase + movie.poster_path} 
                    alt={movie.title}
                    className='w-full h-full object-cover'
                  />
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className='mt-20 md:mt-25 lg:mt-30 mx-5 sm:mx-10 md:mx-20 lg:mx-30'>
          <div className='w-full lg:w-3xl mb-7 md:mb-10 text-center lg:text-left'>
            <p className='text-xl md:text-2xl text-[#1D4ED8] font-semibold mb-4 md:mb-7'>WHY CHOOSE US</p>
            <p className='text-3xl sm:text-4xl md:text-5xl'>Unleashing the Ultimate Movie Experience</p>
          </div>
          <div className='flex flex-col md:flex-row gap-10 md:gap-10 lg:gap-20'>
            <div className='w-full md:w-2xl text-center md:text-left'>
              <div className='bg-[#1D4ED833] rounded-full flex justify-center items-center w-16 h-16 md:w-18 md:h-18 mb-4 mx-auto md:mx-0'>
                <img src={ShieldIcon} alt="Shield Icon" className='w-7 md:w-8' />
              </div>
              <p className='font-bold text-xl md:text-2xl mb-3'>Guaranteed</p>
              <p className='text-lg md:text-xl text-[#A0A3BD]'>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
            </div>
            <div className='w-full md:w-2xl text-center md:text-left'>
              <div className='bg-[#1D4ED833] rounded-full flex justify-center items-center w-16 h-16 md:w-18 md:h-18 mb-4 mx-auto md:mx-0'>
                <img src={VectorIcon} alt="Vector Icon" className='w-7 md:w-8' />
              </div>
              <p className='font-bold text-xl md:text-2xl mb-3'>Affordable</p>
              <p className='text-lg md:text-xl text-[#A0A3BD]'>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
            </div>
            <div className='w-full md:w-2xl text-center md:text-left'>
              <div className='bg-[#1D4ED833] rounded-full flex justify-center items-center w-16 h-16 md:w-18 md:h-18 mb-4 mx-auto md:mx-0'>
                <img src={BubbleIcon} alt="Bubble Icon" className='w-7 md:w-8' />
              </div>
              <p className='font-bold text-xl md:text-2xl mb-3'>24/7 Support</p>
              <p className='text-lg md:text-xl text-[#A0A3BD]'>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a. Lacinia purus ac amet.</p>
            </div>
          </div>
        </section>

        <section className='mt-20 md:mt-25'>
          <div className='block justify-items-center text-center mx-5 sm:mx-10 md:mx-20 lg:mx-30'>
            <p className='text-[#1D4ED8] text-xl md:text-2xl font-bold mb-3 md:mb-5'>MOVIES</p>
            <p className='text-3xl sm:text-4xl md:text-5xl w-full lg:w-3xl mx-auto'>Exciting Movies That Should Be Watched Today</p>
          </div>
          
          <div className='sm:hidden mt-10 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5'>
            <div className='flex gap-5 pb-4'>
              {movies.map((movie) => (
                <div 
                  key={movie.id} 
                  className='flex-none w-72 cursor-pointer'
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <div className='relative group'>
                    <img
                      src={imageBase + movie.poster_path}
                      alt={movie.title}
                      className='w-full h-96 rounded-xl object-cover'
                    />
                  </div>
                  <p className='mt-5 text-xl font-semibold'>{movie.title}</p>
                  <div className='flex gap-3 mt-3 flex-wrap'>
                    {movie.genre_ids.slice(0, 2).map(id => (
                      <p key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-base p-1 pl-3 pr-3 rounded-full'>
                        {genreList[id]}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 mt-10 gap-5 md:gap-7 mx-5 sm:mx-10 md:mx-20 lg:mx-30'>
            {movies.map((movie) => (
              <div key={movie.id}>
                <div className='relative group cursor-pointer' onClick={() => handleMovieClick(movie.id)}>
                  <img
                    src={imageBase + movie.poster_path}
                    alt={movie.title}
                    className='w-full h-96 sm:h-110 rounded-xl object-cover'
                  />
                  <div className='absolute inset-0 bg-black/65 bg-opacity-70 rounded-xl flex flex-col justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(movie.id);
                      }}
                      className='text-white border-2 border-solid border-white px-20 py-3 rounded-lg font-semibold hover:bg-[#1a45b8] hover:border-[#1a45b8] transition'
                    >
                      Details
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMovieClick(movie.id);
                      }}
                      className='bg-[#1a45b8] text-white px-17 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:text-black transition'
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
                <p className='mt-5 text-xl md:text-2xl font-semibold'>{movie.title}</p>
                <div className='flex gap-3 md:gap-5 mt-3 md:mt-5 flex-wrap'>
                  {movie.genre_ids.slice(0, 2).map(id => (
                    <p key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-base md:text-[18px] p-1 pl-3 pr-3 md:pl-4 md:pr-4 rounded-full'>
                      {genreList[id]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => navigate('/movies')} className='hidden sm:flex gap-2 justify-center mt-10 items-center mx-auto hover:opacity-80 transition'>
            <p className='text-[#1D4ED8] text-xl md:text-2xl font-bold'>View All</p>
            <img src={ArrowUpIcon} alt="Arrow Up" className="w-8 md:w-10" />
          </button>
        </section>

        <section className='mt-20 md:mt-25 mb-10'>
          <div className='flex flex-col sm:flex-row justify-between items-center sm:items-center gap-5 sm:gap-0 text-center sm:text-left mx-5 sm:mx-10 md:mx-20 lg:mx-30'>
            <div>
              <p className='text-[#1D4ED8] font-bold text-base md:text-xl'>UPCOMING MOVIES</p>
              <p className='text-3xl sm:text-4xl md:text-5xl mt-4 md:mt-7'>Exciting Movie Coming Soon</p>
            </div>
            <div className='hidden sm:flex gap-3 md:gap-5'>
              <button className='bg-[#A0A3BD] w-14 h-14 md:w-18 md:h-18 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#8a8d9f] transition'>
                <img src={ArrowLeftIcon} alt="Arrow Left" className="w-5 md:w-6"/>
              </button>
              <button className='bg-[#1D4ED8] w-14 h-14 md:w-18 md:h-18 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#1a45b8] transition'>
                <img src={ArrowRightIcon} alt="Arrow Right" className="w-5 md:w-6"/>
              </button>
            </div>
          </div>

          <div className='sm:hidden mt-10 overflow-x-auto scrollbar-hide px-5'>
            <div className='flex gap-5 pb-4'>
              {upcomingMovies.map((movie) => (
                <div 
                  key={movie.id} 
                  className='flex-none w-72 cursor-pointer'
                  onClick={() => handleMovieClick(movie.id)}
                >
                  <img
                    src={imageBase + movie.poster_path}
                    alt={movie.title}
                    className='w-full h-96 rounded-xl object-cover'
                  />
                  <p className='mt-5 text-xl font-semibold'>{movie.title}</p>
                  <div className='flex gap-3 mt-3 flex-wrap'>
                    {movie.genre_ids.slice(0, 2).map(id => (
                      <p key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-base p-1 pl-3 pr-3 rounded-full'>
                        {genreList[id]}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 mt-10 gap-5 md:gap-7 mx-5 sm:mx-10 md:mx-20 lg:mx-30'>
            {upcomingMovies.map((movie) => (
              <div 
                key={movie.id}
                className='cursor-pointer'
                onClick={() => handleMovieClick(movie.id)}
              >
                <img
                  src={imageBase + movie.poster_path}
                  alt={movie.title}
                  className='w-full h-96 sm:h-110 rounded-xl object-cover hover:opacity-80 transition'
                />
                <p className='mt-5 text-xl md:text-2xl font-semibold'>{movie.title}</p>
                <p className='mt-2 text-base font-bold md:text-lg text-[#1D4ED8]'>
                  {new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long'})}
                </p>
                <div className='flex gap-3 md:gap-5 mt-3 md:mt-5 flex-wrap'>
                  {movie.genre_ids.slice(0, 2).map(id => (
                    <p key={id} className='bg-[#A0A3BD1A] text-[#A0A3BD] text-base md:text-[18px] p-1 pl-3 pr-3 md:pl-4 md:pr-4 rounded-full'>
                      {genreList[id]}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <FooterTop />
      <Footer />
    </>
  );
}

export default Home;