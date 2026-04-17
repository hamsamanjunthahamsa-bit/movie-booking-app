import React from 'react';

const MovieBookingItem = ({ movie, onBook }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="movie-overlay">
          <button className="book-btn" onClick={() => onBook(movie)}>Book Ticket</button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="movie-genre">{movie.genre.join(', ')}</p>
        <div className="movie-meta">
          <span className="movie-rating">⭐ {movie.rating}</span>
          <span className="movie-duration">🕒 {movie.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingItem;
