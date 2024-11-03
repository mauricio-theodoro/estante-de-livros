// BookSearch.js
import React, { useEffect, useState } from 'react';
import { searchBooks } from '../services/bookService';
import BookItem from './BookItem';
import '../styles/BookSearch.css';

const BookSearch = ({ searchQuery }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Busca os livros sempre que o query de pesquisa for atualizado
  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        setError('Digite algo para buscar.');
        return;
      }

      setLoading(true);
      setError(''); // Limpa erros anteriores

      try {
        const books = await searchBooks(searchQuery); // Chamada para a API
        if (books.length === 0) {
          setError('Nenhum livro encontrado.'); // Define a mensagem de erro
        } else {
          setResults(books); // Atualiza os resultados
        }
      } catch (error) {
        setError('Erro ao buscar livros. Tente novamente.');
        console.error('Erro ao buscar livros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchQuery]); // Reexecuta a busca ao mudar o query

  return (
    <div className="book-search-container">
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
