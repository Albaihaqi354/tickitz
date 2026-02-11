import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbFetch } from "../../api/tmdb";
import { backendFetch } from "../../api/backend";

export const fetchNowPlaying = createAsyncThunk(
  "movie/fetchNowPlaying",
  async () => {
    const response = await backendFetch("/movies/popular");
    return response.data;
  }
);

export const fetchUpcoming = createAsyncThunk(
  "movie/fetchUpcoming",
  async () => {
    const response = await backendFetch("/movies/upcoming");
    return response.data;
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movie/fetchMovieDetail",
  async (id) => {
    const response = await backendFetch(`/movies/detail/${id}`);
    return response.data[0];
  }
);

export const fetchMovieCredits = createAsyncThunk(
  "movie/fetchMovieCredits",
  async (id) => {
    return await tmdbFetch(`/movie/${id}/credits?language=en-US`);
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