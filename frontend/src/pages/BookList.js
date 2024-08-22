import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [exchanges, setExchanges] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books');
        setBooks(response.data.filter(book => book.status !== 'exchanged'));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleExchangeRequest = async (bookId) => {
    try {
      console.log('Exchange requested for book:', bookId);
      // Add your exchange request logic here
    } catch (error) {
      console.error('Error requesting exchange:', error);
    }
  };

  const handleExchangeResponse = async (exchangeId, status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/exchanges/${exchangeId}`, { status });
      if (status === 'accepted' && response.data.msg === 'Exchange completed successfully') {
        setBooks(books.filter(book => book._id !== response.data.requestedBook && book._id !== response.data.offeredBook));
      }
      setExchanges(exchanges.map(exchange => exchange._id === exchangeId ? { ...exchange, status } : exchange));
    } catch (error) {
      console.error('Error responding to exchange:', error);
    }
  };

  return (
    <div>
      <h1>Available Books</h1>
      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onExchangeRequest={handleExchangeRequest} // Pass the function here
          />
        ))}
      </div>
      <Link to="/add-book">Add New Book</Link>

      <h1>Your Exchanges</h1>
      <div className="exchange-list">
        {exchanges.map((exchange) => (
          <div key={exchange._id}>
            <p>
              You offered "{exchange.offeredBook.title}" for "{exchange.requestedBook.title}".
              Status: {exchange.status}
            </p>
            {exchange.status === 'pending' && (
              <div>
                <button onClick={() => handleExchangeResponse(exchange._id, 'accepted')}>Accept</button>
                <button onClick={() => handleExchangeResponse(exchange._id, 'rejected')}>Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
