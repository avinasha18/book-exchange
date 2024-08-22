import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const { user } = useAuth(); // Get the user from the AuthContext

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const response = await axios.get('/api/exchanges');
        setExchanges(response.data);
      } catch (error) {
        console.error('Error fetching exchanges:', error);
      }
    };
    fetchExchanges();
  }, []);

  const handleRespondToExchange = async (exchangeId, status) => {
    try {
      await axios.put(`/api/exchanges/${exchangeId}`, { status });
      // Refresh exchanges after responding
      const response = await axios.get('/api/exchanges');
      setExchanges(response.data);
    } catch (error) {
      console.error('Error responding to exchange:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">My Exchanges</h2>
      <div className="space-y-4">
        {exchanges.map((exchange) => (
          <div key={exchange._id} className="bg-white shadow-md rounded-lg p-4">
            <p>Requested Book: {exchange.requestedBook.title}</p>
            <p>Offered Book: {exchange.offeredBook.title}</p>
            <p>Status: {exchange.status}</p>
            {exchange.status === 'pending' && exchange.owner === user?._id && ( // Use optional chaining and compare with user._id
              <div className="mt-2">
                <button
                  onClick={() => handleRespondToExchange(exchange._id, 'accepted')}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleRespondToExchange(exchange._id, 'rejected')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exchanges;