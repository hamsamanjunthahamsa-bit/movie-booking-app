import React, { useEffect, useState } from 'react';

const TicketModal = ({ booking, onClose }) => {
  const { movie, date, time, theater, seats } = booking;
  const [ticketId, setTicketId] = useState('');
  
  useEffect(() => {
    // Generate static UI ID for a professional look
    setTicketId(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);

  // Encode the QR code string dynamically using an open API
  const qrData = encodeURIComponent(`CineTick Booking: ${ticketId} | ${movie.title} | ${date} ${time} | Seats: ${seats.join(',')}`);
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}&color=ffffff&bgcolor=1a1a24`;

  const handleDownload = () => {
    // Triggers the native browser print dialogue box, acting effectively like a "Save to PDF" for tickets
    window.print();
  };

  return (
    <div className="modal-overlay ticket-overlay">
      <div className="ticket-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="ticket-card" id="printable-ticket">
          <div className="ticket-left">
            <img src={movie.poster} alt={movie.title} className="ticket-poster" />
          </div>
          <div className="ticket-right">
            <h2>{movie.title}</h2>
            <p className="ticket-theater">🍿 {theater}</p>
            
            <div className="ticket-details">
              <div className="detail-box">
                <span>Date</span>
                <strong>{date}</strong>
              </div>
              <div className="detail-box">
                <span>Time</span>
                <strong>{time}</strong>
              </div>
              <div className="detail-box">
                <span>Seats</span>
                <strong>{seats.join(', ')}</strong>
              </div>
            </div>

            <div className="ticket-barcode-section">
              <div className="qr-code">
                {ticketId && <img src={qrCodeUrl} alt="Ticket QR Code" crossOrigin="anonymous" />}
              </div>
              <div className="ticket-id">
                <span>Booking ID:</span>
                <strong>{ticketId}</strong>
                <span style={{marginTop: '0.5rem', fontSize: '0.75rem'}}>Scan at entrance</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ticket-actions">
          <button className="download-btn" onClick={handleDownload}>
            ⬇️ Save / Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
