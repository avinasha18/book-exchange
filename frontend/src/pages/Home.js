import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Book Exchange Platform</h1>
      <p className="text-xl mb-4">
        Exchange books with other readers and discover new stories!
      </p>
      <div className="space-x-4">
        <Link
          to="/books"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Browse Books
        </Link>
        <Link
          to="/books/add"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          List a Book
        </Link>
      </div>
    </div>
  );
};

export default Home;