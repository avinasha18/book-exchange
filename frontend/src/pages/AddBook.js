import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookForm from '../components/BookForm';

const AddBook = () => {
  const navigate = useNavigate();

  const handleSubmit = async (bookData) => {
    try {
      await axios.post('http://localhost:5000/api/books', bookData);
      navigate('/books');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddBook;