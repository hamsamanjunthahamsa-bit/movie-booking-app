import React, { useState } from 'react';
import MovieBookingItem from './MovieBookingItem';
import MovieBookingModal from './MovieBookingModal';
import TicketModal from './TicketModal';

const mockMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    genre: ["Sci-Fi", "Adventure"],
    rating: "8.8",
    duration: "2h 46m",
    poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Batman",
    genre: ["Action", "Crime"],
    rating: "7.9",
    duration: "2h 55m",
    poster: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Oppenheimer",
    genre: ["Drama", "History"],
    rating: "8.4",
    duration: "3h",
    poster: "https://images.unsplash.com/photo-1520607162513-3bdf70db1f88?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Interstellar",
    genre: ["Sci-Fi", "Drama"],
    rating: "8.7",
    duration: "2h 49m",
    poster: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800&auto=format&fit=crop"
  }
];

const MovieBookingList = () => {
  const [movies] = useState(mockMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookedMovie, setBookedMovie] = useState(null);

  const handleBookTicket = (movie) => {
    setSelectedMovie(movie);
  };

  const confirmBooking = (bookingDetails) => {
    setSelectedMovie(null);
    setBookedMovie(bookingDetails);
  };

  return (
    <div className="movie-booking-container">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🍿</span>
          CineTick
        </div>
        <nav>
          <a href="#" className="active">Now Showing</a>
          <a href="#">Coming Soon</a>
          <a href="#">My Tickets</a>
        </nav>
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Guest&background=0D8ABC&color=fff" alt="User" />
        </div>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <h1>Experience Cinema<br/><span className="text-gradient">Like Never Before</span></h1>
          <p>Book tickets for the latest blockbusters with premium features and best-in-class comfort.</p>
        </div>

        <section className="movies-section">
          <div className="section-header">
            <h2>Trending Now</h2>
            <button className="view-all-btn">View All</button>
          </div>
          
          <div className="movie-grid">
            {movies.map(movie => (
              <MovieBookingItem 
                key={movie.id} 
                movie={movie} 
                onBook={handleBookTicket} 
              />
            ))}
          </div>
        </section>
      </main>

      {selectedMovie && (
        <MovieBookingModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)}
          onConfirm={confirmBooking}
        />
      )}

      {bookedMovie && (
        <TicketModal 
          booking={bookedMovie} 
          onClose={() => setBookedMovie(null)} 
        />
      )}
    </div>
  );
};

export default MovieBookingList;
