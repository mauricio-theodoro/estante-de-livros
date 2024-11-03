import React, { useState } from 'react';
import { searchBooks } from '../services/bookService';
import BookItem from './BookItem';
import '../styles/BookSearch.css';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const books = await searchBooks(query);
      setResults(books);
    } catch (error) {
      console.error('Error searching books:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="search-results">
          {results.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookSearch;
