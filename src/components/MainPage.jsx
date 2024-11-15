import React, { useState } from 'react';
import BookShelf from './BookShelf';
import './styles/MainPage.css';

const MainPage = ({ readingBooks, wantToReadBooks, readBooks, favoriteBooks, setReadingBooks, setWantToReadBooks, setReadBooks, setFavoriteBooks }) => {
  
  const handleChangeShelf = (bookId, newShelf) => {
    const updatedBooks = [...readingBooks, ...wantToReadBooks, ...readBooks, ...favoriteBooks];
    const book = updatedBooks.find(b => b.id === bookId);

    if (!book) {
      console.error('Livro não encontrado');
      return;
    }

    // Remover o livro da estante atual
    const removeFromCurrentShelf = (currentShelf) => {
      if (currentShelf === 'reading') {
        setReadingBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
      } else if (currentShelf === 'wantToRead') {
        setWantToReadBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
      } else if (currentShelf === 'read') {
        setReadBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
      } else if (currentShelf === 'favorite') {
        setFavoriteBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
      }
    };

    removeFromCurrentShelf(book.shelf);

    // Atualiza a estante do livro
    book.shelf = newShelf;

    // Adiciona o livro à nova estante
    const addToNewShelf = (newShelf) => {
      if (newShelf === 'reading') {
        setReadingBooks(prevBooks => [...prevBooks, book]);
      } else if (newShelf === 'wantToRead') {
        setWantToReadBooks(prevBooks => [...prevBooks, book]);
      } else if (newShelf === 'read') {
        setReadBooks(prevBooks => [...prevBooks, book]);
      } else if (newShelf === 'favorite') {
        setFavoriteBooks(prevBooks => [...prevBooks, book]);
      }
    };

    addToNewShelf(newShelf);
  };

  return (
    <div className="main-page">
      <h1 className="page-title">Estante de Livros</h1>

      {/* Estante de Favoritos no topo */}
      <div className="shelf favorite-shelf">
        <h2>Favoritos</h2>
        <BookShelf books={favoriteBooks} onChangeShelf={handleChangeShelf} />
      </div>

      {/* Estantes de Livros */}
      <div className="book-shelves">
        <div className="shelf">
          <h2>Estou Lendo</h2>
          <BookShelf books={readingBooks} onChangeShelf={handleChangeShelf} />
        </div>
        <div className="shelf">
          <h2>Quero Ler</h2>
          <BookShelf books={wantToReadBooks} onChangeShelf={handleChangeShelf} />
        </div>
        <div className="shelf">
          <h2>Já Lido</h2>
          <BookShelf books={readBooks} onChangeShelf={handleChangeShelf} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
