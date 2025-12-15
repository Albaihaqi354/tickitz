import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbFetch } from "../../api/tmdb";

export const fetchNowPlaying = createAsyncThunk(
  "movie/fetchNowPlaying",
  async () => {
    const data = await tmdbFetch("/movie/now_playing?language=en-US&page=1");
    return data.results;
  }
);

export const fetchUpcoming = createAsyncThunk(
  "movie/fetchUpcoming",
  async () => {
    const data = await tmdbFetch("/movie/upcoming?language=en-US&page=1");
    return data.results;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movie/fetchMovieDetail",
  async (id) => {
    return await tmdbFetch(`/movie/${id}?language=en-US`);
  }
);

export const fetchMovieCredits = createAsyncThunk(
  "movie/fetchMovieCredits",
  async (id) => {
    return await tmdbFetch(`/movies/${id}/credits?language=en-US`);
  }
);

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlaying: [],
    upcoming: [],
    detail: null,
    credits: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowPlaying.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNowPlaying.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlaying = action.payload;
      })
      .addCase(fetchNowPlaying.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUpcoming.fulfilled, (state, action) => {
        state.upcoming = action.payload;
      })

      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detail = action.payload;
      })

      .addCase(fetchMovieCredits.fulfilled, (state, action) => {
        state.credits = action.payload;
      });
  },
});

export default movieSlice.reducer;
