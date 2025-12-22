import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchNowPlaying } from '../redux/slices/movie.slice';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../assets/image1.svg";
import ArrowRightIcon from "../assets/arrow-right.svg";
import FooterTop from "../components/FooterTop";
import ButtonScrollToTop from "../components/ButtonScrolToTop";

function HomeView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { nowPlaying, loading } = useSelector((state) => state.movie);
  
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);

  const TMDB_IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

  const genreList = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary",
    18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music",
    9648: "Mystery", 10749: "Romance", 878: "Science Fiction", 10770: "TV Movie", 53: "Thriller",
    10752: "War", 37: "Western",
  };

  useEffect(() => {
    dispatch(fetchNowPlaying());
  }, [dispatch]);

  const filteredMovies = useMemo(() => {
    return nowPlaying
      .filter((movie) => !genre || movie.genre_ids.includes(genre))
      .filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [genre, search, nowPlaying]);

  const ITEMS_PER_PAGE = 12;
  const TOTAL_PAGES = 4;

  const currentMovies = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredMovies.slice(startIndex, endIndex);
  }, [filteredMovies, page]);

  const handleGenreClick = (genreId) => {
    setGenre(genreId === null ? null : parseInt(genreId));
    setPage(1);
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setPage(1);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`);
  };

  const handlePageClick = (pageToGo) => {
    setPage(pageToGo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && nowPlaying.length === 0) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-2xl text-[#1D4ED8]">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="relative">
          <img
            src={Background}
            alt="Background"
            className="w-full h-64 sm:h-80 md:h-96 lg:h-125 object-cover"
          />
          <div className="absolute inset-0 bg-black/65 flex items-center justify-start px-5 sm:px-10 md:px-15 lg:pl-20">
            <div className="text-white w-full sm:w-4/5 md:w-3/4 lg:w-165">
              <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold mb-2 sm:mb-3 md:mb-4">
                LIST MOVIE OF THE WEEK
              </h1>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight">
                Experience the Magic of Cinema: Book Your Tickets Today
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 sm:mt-10 md:mt-12 lg:mt-15 px-5 sm:px-8 md:px-10">
          <div className="flex flex-col lg:flex-row justify-center gap-5 lg:gap-8">
            <div className="flex flex-col w-full lg:w-auto">
              <label
                htmlFor="search-input"
                className="text-base sm:text-lg md:text-xl text-[#4E4B66] mb-2"
              >
                Cari Event
              </label>
              <input
                type="text"
                placeholder="New Born Expert"
                id="search-input"
                value={search}
                onChange={handleSearchChange}
                className="w-full lg:w-100 h-12 sm:h-14 md:h-16 lg:h-17 text-base sm:text-lg md:text-xl p-3 pr-11 border-2 border-gray-300 rounded-md focus:border-blue-700 focus:ring-4 focus:ring-blue-300 outline-none"
              />
            </div>

            <div className="w-full lg:w-auto lg:flex-1 lg:max-w-3xl">
              <p className="text-base sm:text-lg md:text-xl text-[#4E4B66] mb-2">
                Filter
              </p>
              <div className="flex gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-5 overflow-x-auto pb-2">
                <button
                  key="all"
                  onClick={() => handleGenreClick(null)}
                  className={`${
                    !genre
                      ? "bg-[#1D4ED8] text-white"
                      : "text-[#4E4B66]"
                  } text-sm sm:text-base md:text-lg p-2 px-3 sm:px-4 md:px-5 rounded-md hover:bg-[#1a45b8] hover:text-white transition whitespace-nowrap`}
                >
                  All
                </button>
                {Object.entries(genreList).map(([id, name]) => (
                  <button
                    key={id}
                    onClick={() => handleGenreClick(parseInt(id))}
                    className={`${
                      genre === parseInt(id)
                        ? "bg-[#1D4ED8] text-white"
                        : "text-[#4E4B66]"
                    } text-sm sm:text-base md:text-lg p-2 px-3 sm:px-4 md:px-5 rounded-md hover:bg-[#1a45b8] hover:text-white transition whitespace-nowrap`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 sm:mt-10 gap-5 md:gap-6 lg:gap-7 mx-auto max-w-7xl">
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
                <div key={movie.id} className="w-full">
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => handleMovieClick(movie.id)}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? TMDB_IMAGE_BASE + movie.poster_path
                          : "/fallback.jpg"
                      }
                      alt={movie.title}
                      className="w-full h-80 sm:h-96 md:h-100 lg:h-110 rounded-xl object-cover"
                    />

                    <div className="absolute inset-0 bg-black/65 bg-opacity-70 rounded-xl flex flex-col justify-center items-center gap-3 sm:gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="text-white border-2 border-solid border-white px-12 sm:px-16 md:px-20 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#1a45b8] hover:border-[#1a45b8] transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMovieClick(movie.id);
                        }}
                      >
                        Details
                      </button>

                      <button className="bg-[#1a45b8] text-white px-10 sm:px-14 md:px-17 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 hover:text-black transition">
                        Buy Ticket
                      </button>
                    </div>
                  </div>

                  <p className="mt-3 sm:mt-4 md:mt-5 text-lg sm:text-xl md:text-2xl font-semibold line-clamp-2">
                    {movie.title}
                  </p>

                  <div className="flex gap-2 sm:gap-3 md:gap-5 mt-2 sm:mt-3 md:mt-5 flex-wrap">
                    {movie.genre_ids.slice(0, 2).map((id) => (
                      <p
                        key={id}
                        className="bg-[#A0A3BD1A] text-[#A0A3BD] text-sm sm:text-base md:text-[18px] p-1 px-2 sm:px-3 md:px-4 rounded-full"
                      >
                        {genreList[id]}
                      </p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-center py-10">
                <p className="text-xl sm:text-2xl text-[#4E4B66]">
                  Tidak ada film yang ditemukan
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 mt-8 sm:mt-10 pb-10">
            {[1, 2, 3, 4].map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={`${
                  page === pageNum
                    ? 'bg-[#1D4ED8] text-white'
                    : 'bg-[#F9FAFB] text-[#A0A3BD]'
                } w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#1a45b8] hover:text-white transition text-sm sm:text-base`}
              >
                {pageNum}
              </button>
            ))}
            <button 
              onClick={() => handlePageClick(Math.min(page + 1, TOTAL_PAGES))}
              disabled={page === TOTAL_PAGES}
              className={`${
                page === TOTAL_PAGES
                  ? 'bg-gray-300' 
                  : 'bg-[#1D4ED8] hover:bg-[#1a45b8]'
              } w-8 h-8 sm:w-10 cursor-pointer sm:h-10 rounded-full flex justify-center items-center transition`}
            >
              <img
                src={ArrowRightIcon}
                alt="Arrow Right"
                className="w-4 sm:w-5 md:w-6"
              />
            </button>
          </div>
        </section>
      </main>
      
      <ButtonScrollToTop/>
      <FooterTop />
      <Footer />
    </>
  );
}

export default HomeView;