import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import EbvLogo from '../assets/ebv.svg';
import CineOneLogo from '../assets/CineOne21.svg';
import HiflixLogo from '../assets/hiflix.svg';

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const imageBase = "https://image.tmdb.org/t/p/w500";
  const backdropBase = "https://image.tmdb.org/t/p/original";

//   const genreList = {
//     28: "Action",
//     12: "Adventure",
//     16: "Animation",
//     35: "Comedy",
//     80: "Crime",
//     99: "Documentary",
//     18: "Drama",
//     10751: "Family",
//     14: "Fantasy",
//     36: "History",
//     27: "Horror",
//     10402: "Music",
//     9648: "Mystery",
//     10749: "Romance",
//     878: "Science Fiction",
//     10770: "TV Movie",
//     53: "Thriller",
//     10752: "War",
//     37: "Western"
//   };

  useEffect(() => {
    // Fetch Movie Details
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Mjk1ZDJhYzg5NDE1MDdmNTFhNDMyNjUwMWU0MjBiYyIsIm5iZiI6MTc2NDM4MzY0Mi43MTQsInN1YiI6IjY5MmE1YjlhZTYyNTU3OTZhZjRjNDAwZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sGseaIHAZhc8l66sp3TUwoWXTLl7qyL_558oEkZgi6I"
      }
    })
      .then(res => res.json())
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
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

      <main>
        <section className="relative">
          <img 
            src={movie.backdrop_path ? backdropBase + movie.backdrop_path : imageBase + movie.poster_path} 
            alt={movie.title}
            className="w-full h-64 sm:h-80 md:h-96 lg:h-125 object-cover"
          />
          <div className="absolute inset-0 bg-black/65 flex items-center justify-start px-5 sm:px-10 md:px-15 lg:pl-20" />
        </section>

        <section className="px-5 sm:px-10 md:px-15 lg:px-30 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <img 
              src={movie.poster_path ? imageBase + movie.poster_path : 'https://via.placeholder.com/400x600?text=No+Image'} 
              alt={movie.title}
              className="w-full lg:w-80 h-96 lg:h-110 rounded-xl object-cover shadow-lg"
            />

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-semibold">{movie.title}</h1>
              
              <div className="flex gap-3 mt-4 flex-wrap">
                {movie.genres && movie.genres.slice(0, 3).map(genre => (
                  <span key={genre.id} className="bg-[#A0A3BD1A] text-[#A0A3BD] text-lg px-4 py-1 rounded-full">
                    {genre.name}
                  </span>
                ))}
              </div>

              {movie.vote_average > 0 && (
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-xl font-semibold">{movie.vote_average.toFixed(1)}</span>
                    <span className="ml-1 text-[#8692A6]">/ 10</span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                <div>
                  <p className="text-[#8692A6] text-lg">Release date</p>
                  <p className="text-xl mt-1">{movie.release_date ? formatDate(movie.release_date) : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-lg">Duration</p>
                  <p className="text-xl mt-1">{movie.runtime ? formatDuration(movie.runtime) : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-lg">Original Language</p>
                  <p className="text-xl mt-1">{movie.original_language ? movie.original_language.toUpperCase() : 'N/A'}</p>
                </div>
                
                <div>
                  <p className="text-[#8692A6] text-lg">Budget</p>
                  <p className="text-xl mt-1">
                    {movie.budget > 0 ? `$${(movie.budget / 1000000).toFixed(1)}M` : 'N/A'}
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

          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Production Companies</h3>
              <div className="flex gap-4 flex-wrap">
                {movie.production_companies.slice(0, 4).map(company => (
                  <div key={company.id} className="text-[#8692A6]">
                    {company.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="px-5 sm:px-10 md:px-15 lg:px-30 py-10">
          <h2 className="text-3xl font-semibold">Book Tickets</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div>
              <label className="text-xl font-semibold block mb-3">Choose Date</label>
              <select className="w-full bg-[#EFF0F6] h-13 rounded-lg px-5 text-lg outline-none">
                <option value="">Select Date</option>
                <option value="">Today</option>
                <option value="">Tomorrow</option>
                <option value="">Next Week</option>
              </select>
            </div>

            <div>
              <label className="text-xl font-semibold block mb-3">Choose Time</label>
              <select className="w-full bg-[#EFF0F6] h-13 rounded-lg px-5 text-lg outline-none">
                <option value="">Select Time</option>
                <option value="">08:30 AM</option>
                <option value="">12:30 PM</option>
                <option value="">03:30 PM</option>
                <option value="">07:30 PM</option>
              </select>
            </div>

            <div>
              <label className="text-xl font-semibold block mb-3">Choose Location</label>
              <select className="w-full bg-[#EFF0F6] h-13 rounded-lg px-5 text-lg outline-none">
                <option value="">Select Location</option>
                <option value="">Jakarta</option>
                <option value="">Bandung</option>
                <option value="">Surabaya</option>
                <option value="">Bogor</option>
              </select>
            </div>
          </div>

          <button className="bg-[#1D4ED8] hover:bg-[#1a45b8] text-white w-full sm:w-auto px-12 h-13 rounded-lg mt-6 transition-colors text-lg font-medium">
            Filter
          </button>
        </section>

        <section className="px-5 sm:px-10 md:px-15 lg:px-30 py-10">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl font-semibold">Choose Cinema</h2>
            <span className="text-xl text-[#8692A6]">39 Results</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            <div className="flex items-center justify-center border-2 border-[#DEDEDE] rounded-lg p-8 hover:border-[#1D4ED8] transition-colors cursor-pointer">
              <img src={EbvLogo} alt="EBV Cinema" className="w-32 h-auto" />
            </div>
            
            <div className="flex items-center justify-center border-2 bg-[#1D4ED8] border-[#1D4ED8] rounded-lg p-8 cursor-pointer">
              <img src={HiflixLogo} alt="Hiflix Cinema" className="w-32 h-auto brightness-0 invert" />
            </div>
            
            <div className="flex items-center justify-center border-2 border-[#DEDEDE] rounded-lg p-8 hover:border-[#1D4ED8] transition-colors cursor-pointer">
              <img src={CineOneLogo} alt="CineOne Cinema" className="w-32 h-auto" />
            </div>
            
            <div className="flex items-center justify-center border-2 border-[#DEDEDE] rounded-lg p-8 hover:border-[#1D4ED8] transition-colors cursor-pointer">
              <img src={EbvLogo} alt="EBV Cinema" className="w-32 h-auto" />
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
            <button className="bg-[#1D4ED8] hover:bg-[#1a45b8] text-white px-16 py-4 rounded-lg transition-colors text-lg font-medium">
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