import React, { useState } from 'react';
import { searchBooks } from '../services/bookService';
import BookItem from './BookItem';
import '../styles/BookSearch.css';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Função que lida com a busca de livros
  const handleSearch = async () => {
    if (!query.trim()) {
      setResults([]); // Limpa os resultados se a consulta estiver vazia
      setError('Digite algo para buscar.');
      return;
    }

    setLoading(true);
    setError(''); // Limpa qualquer erro anterior

    try {
      const books = await searchBooks(query); // Busca pelo nome do livro
      if (books.length === 0) {
        setError('Nenhum livro encontrado.'); // Define a mensagem de erro se não encontrar
      } else {
        setResults(books); // Atualiza os resultados com os livros encontrados
      }
    } catch (error) {
      setError('Erro ao buscar livros. Tente novamente.');
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o clique no botão ou Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div className="book-search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Busque por um livro..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="search-results">
        {results.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
