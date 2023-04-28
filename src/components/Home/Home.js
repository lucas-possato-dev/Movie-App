import React from 'react';
import "./Home.scss";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice'

const Home = () => {

  const dispatch = useDispatch();

  React.useEffect(() => {
    
    dispatch(fetchAsyncMovies());
    dispatch(fetchAsyncShows());
  }, [dispatch])

  return (
    <div>
      <div className='banner-img'></div>
      <MovieListing />
    </div>
    
  )
}

export default Home