import React, { useState } from 'react';

const MovieBookingModal = ({ movie, onClose, onConfirm }) => {
  const dates = ['Apr 18', 'Apr 19', 'Apr 20', 'Apr 21'];
  const timings = ['10:00 AM', '1:30 PM', '4:45 PM', '8:00 PM'];
  const theaters = ['Cineplex IMAX', 'AMC Starlight', 'Galaxy Theaters'];

  const [date, setDate] = useState(dates[0]);
  const [time, setTime] = useState(timings[0]);
  const [theater, setTheater] = useState(theaters[0]);
  const [seats, setSeats] = useState([]);
  
  const ticketPrice = 15; // Set price per seat
  const totalAmount = seats.length * ticketPrice;

  // Generate a mock seat grid (6 rows, 8 seats)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8];

  const handleSeatClick = (seatId) => {
    if (seats.includes(seatId)) {
      setSeats(seats.filter(s => s !== seatId));
    } else {
      setSeats([...seats, seatId]);
    }
  };

  const handleConfirm = () => {
    if (seats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }
    onConfirm({ movie, date, time, theater, seats, totalAmount });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="modal-header">
          <h2>Book Tickets for <span>{movie.title}</span></h2>
        </div>

        <div className="modal-body">
          <div className="selection-group">
            <label>Select Theater</label>
            <div className="options-row">
              {theaters.map(t => (
                <button 
                  key={t} 
                  className={`option-btn ${theater === t ? 'selected' : ''}`}
                  onClick={() => setTheater(t)}
                >{t}</button>
              ))}
            </div>
          </div>

          <div className="selection-group">
            <label>Select Date</label>
            <div className="options-row">
              {dates.map(d => (
                <button 
                  key={d} 
                  className={`option-btn ${date === d ? 'selected' : ''}`}
                  onClick={() => setDate(d)}
                >{d}</button>
              ))}
            </div>
          </div>

          <div className="selection-group">
            <label>Select Time</label>
            <div className="options-row">
              {timings.map(t => (
                <button 
                  key={t} 
                  className={`option-btn ${time === t ? 'selected' : ''}`}
                  onClick={() => setTime(t)}
                >{t}</button>
              ))}
            </div>
          </div>

          <div className="selection-group">
            <label>Select Seats</label>
            <div className="screen-indicator">SCREEN</div>
            <div className="seat-grid">
              {rows.map(row => (
                <div key={row} className="seat-row">
                  <span className="row-label">{row}</span>
                  {cols.map(col => {
                    const seatId = `${row}${col}`;
                    const isSelected = seats.includes(seatId);
                    // Mock occupied seats
                    const isOccupied = (row === 'D' && col > 2 && col < 6) || (row === 'F' && col === 8);
                    return (
                      <button 
                        key={seatId} 
                        className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                        onClick={() => !isOccupied && handleSeatClick(seatId)}
                        disabled={isOccupied}
                      ></button>
                    );
                  })}
                  <span className="row-label right">{row}</span>
                </div>
              ))}
            </div>
            
            <div className="seat-legend">
              <div className="legend-item"><div className="seat"></div> Available</div>
              <div className="legend-item"><div className="seat selected"></div> Selected</div>
              <div className="legend-item"><div className="seat occupied"></div> Occupied</div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="booking-summary">
            {seats.length > 0 ? (
              <>
                <p>({seats.length}) Seats Selected: <strong>{seats.join(', ')}</strong></p>
                <p style={{ marginTop: '0.3rem', fontSize: '1.1rem', color: '#fff' }}>Total Payable: <strong style={{ color: '#ff3366' }}>${totalAmount}</strong></p>
              </>
            ) : (
              <p>No seats selected ($15/seat)</p>
            )}
          </div>
          <button className="confirm-btn" onClick={handleConfirm} disabled={seats.length === 0}>
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingModal;
