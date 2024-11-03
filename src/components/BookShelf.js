// BookShelf.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/bookService'; // Importa fetchBooks corretamente
import BookItem from './BookItem';
import '../styles/BookShelf.css';

const BookShelf = ({ onFavoriteToggle, favoriteBooks }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função para buscar todos os livros
  const loadBooks = async () => {
    setLoading(true);
    setError(''); // Limpa erros anteriores

    try {
      const allBooks = await fetchBooks(); // Usa fetchBooks para obter todos os livros
      setBooks(allBooks);
    } catch (error) {
      setError('Erro ao carregar livros. Tente novamente.');
      console.error('Erro ao carregar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  // Busca os livros quando o componente é montado
  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="book-shelf">
      <h2>Favoritos</h2>
      {favoriteBooks.length === 0 && <p>Nenhum livro favoritado ainda.</p>}
      <div className="favorites-grid">
        {favoriteBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={true}
          />
        ))}
      </div>

      <h2>Estante de Livros</h2>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favoriteBooks.some((favBook) => favBook.id === book.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
