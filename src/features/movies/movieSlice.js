import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieApi from "../../common/api/movieApi";
import { APIKey } from "../../common/api/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies', async () => {

  const movieText = "Harry";
  const response = await movieApi.get(`?apiKey=${APIKey}&s=${movieText}&type=movie`)
  return response.data;
});

export const fetchAsyncShows = createAsyncThunk('movies/fetchAsyncShows', async () => {

  const seriesText = "Friends";
  const response = await movieApi.get(`?apiKey=${APIKey}&s=${seriesText}&type=series`)
  return response.data;
});

export const fetchAsyncMovieOrShowDetail = createAsyncThunk('movies/fetchAsyncMovieOrShowDetail', async (id) => {

  const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
  return response.data;
});

const initialState = {
  movies: {},
  shows: {},
  selectedMovieOrShow: {}
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectedMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {})
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        state.movies = payload;
      })
      .addCase(fetchAsyncMovies.rejected, (state) => {})
      .addCase(fetchAsyncShows.fulfilled, (state, { payload }) => {
        state.shows = payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, { payload }) => {
        state.selectedMovieOrShow = payload;
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;
