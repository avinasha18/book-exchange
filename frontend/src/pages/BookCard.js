import React from 'react';

const BookCard = ({ book, onExchangeRequest }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <button onClick={() => onExchangeRequest(book._id)}>Request Exchange</button>
    </div>
  );
};

export default BookCard;
