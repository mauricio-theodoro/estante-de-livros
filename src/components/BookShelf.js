import React, { useEffect, useState } from 'react';
import BookItem from './BookItem';
import { fetchBooks } from '../services/bookService';
import '../styles/BookShelf.css';
const BookShelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      }
    };

    getBooks();
  }, []);

  return (
    <div className="book-shelf">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookShelf;