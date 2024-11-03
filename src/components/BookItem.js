import React from 'react';
import '../styles/BookItem.css';

const BookItem = ({ book }) => {
  return (
    <div className="book-item">
      <img src={book.imageLinks?.thumbnail} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.subtitle}</p>
      <p>Authors: {book.authors.join(', ')}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Published Date: {book.publishedDate}</p>
      <p>Description: {book.description}</p>
      <p>Average Rating: {book.averageRating}</p>
      <a href={book.infoLink} target="_blank" rel="noopener noreferrer">More Info</a>
    </div>
  );
};

export default BookItem;