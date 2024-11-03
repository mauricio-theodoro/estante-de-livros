// Favorites.js
import React from 'react';
import BookItem from './BookItem';
import '../styles/Favorites.css'; // Importa o CSS para a página de favoritos

const Favorites = ({ favoriteBooks, onFavoriteToggle }) => {
  return (
    <div className="favorites">
      <h2>Meus Livros Favoritos</h2>
      {favoriteBooks.length === 0 ? (
        <p>Nenhum livro favorito ainda.</p>
      ) : (
        <div className="book-list">
          {favoriteBooks.map((book) => (
            <BookItem 
              key={book.id} 
              book={book} 
              onFavoriteToggle={onFavoriteToggle} 
              isFavorite={true} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
