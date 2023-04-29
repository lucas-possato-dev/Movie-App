import React from 'react';
import { Link } from 'react-router-dom';
import user from "../../images/user.png";
import "./Header.scss";
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';

const Header = () => {
  const [term, setTerm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    if(term.length > 0) {
      dispatch(fetchAsyncMovies(term));
      dispatch(fetchAsyncShows(term));
      setTerm("");
    }  
  }

  return (
    <div className='header'>
      
        <div className='logo'>
          <Link to="/">Movie App</Link>
        </div>
        <div className='search-bar'>
          <form onSubmit={handleSubmit}>
            <input type="text" value={term} placeholder='Search Movies or Shows'
            onChange={({target}) => setTerm(target.value)} />
            <button type='submit'><i className='fa fa-search'></i></button>
          </form>
        </div>
         
      <div className='user_image'>
        <img src={user} alt="user" />
      </div>
    </div>
  )
}

export default Header