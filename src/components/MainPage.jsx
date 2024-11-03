// MainPage.jsx
import React from 'react';
import BookShelf from './BookShelf';
import './MainPage.css';

const MainPage = ({ readingBooks, wantToReadBooks, readBooks, setReadingBooks, setWantToReadBooks, setReadBooks }) => {
  
  const handleChangeShelf = (bookId, newShelf) => {
    // Encontrar o livro que foi movido
    const updatedBooks = [...readingBooks, ...wantToReadBooks, ...readBooks];
    const book = updatedBooks.find(b => b.id === bookId);

    // Remover o livro da estante atual
    if (book.shelf === 'reading') {
      setReadingBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
    } else if (book.shelf === 'wantToRead') {
      setWantToReadBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
    } else if (book.shelf === 'read') {
      setReadBooks(prevBooks => prevBooks.filter(b => b.id !== bookId));
    }

    // Atualizar a estante do livro
    book.shelf = newShelf;

    // Adicionar o livro à nova estante
    if (newShelf === 'reading') {
      setReadingBooks(prevBooks => [...prevBooks, book]);
    } else if (newShelf === 'wantToRead') {
      setWantToReadBooks(prevBooks => [...prevBooks, book]);
    } else if (newShelf === 'read') {
      setReadBooks(prevBooks => [...prevBooks, book]);
    }
  };

  return (
    <div className="main-page">
      <h1 className="page-title">Estante de Livros</h1>
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
