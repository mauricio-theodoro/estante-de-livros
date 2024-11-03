// BookShelf.js
import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/bookService'; // Importa fetchBooks corretamente
import BookItem from './BookItem';
import '../styles/BookShelf.css';

const BookShelf = () => {
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
      <h2>Estante de Livros</h2>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="book-list">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookShelf;
