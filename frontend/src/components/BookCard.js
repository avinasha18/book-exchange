import React from 'react';

const BookCard = ({ book, onExchange }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold">{book.title}</h3>
      <p className="text-gray-600">Author: {book.author}</p>
      <p className="text-gray-600">Genre: {book.genre}</p>
      <p className="text-gray-600">Owner: {book.owner.username}</p>
      <button
        onClick={() => onExchange(book._id)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Request Exchange
      </button>
    </div>
  );
};

export default BookCard;