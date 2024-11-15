import React, { useEffect, useState } from 'react';
import { searchBooks } from '../services/bookService'; // Função para buscar livros na API
import BookItem from './BookItem'; // Componente para exibir cada livro
import '../styles/BookSearch.css'; // Estilos específicos para este componente

const BookSearch = ({ searchQuery }) => {
  // Estados para armazenar os resultados da busca, erros, filtro, ordenação e carregamento
  const [results, setResults] = useState([]); // Resultados da busca
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [error, setError] = useState(''); // Mensagem de erro
  const [filter, setFilter] = useState(''); // Filtro de categoria
  const [sortOrder, setSortOrder] = useState(''); // Ordem de exibição dos livros

  // Função para buscar livros sempre que o `searchQuery`, `filter` ou `sortOrder` mudam
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Inicia o carregamento
      setError(''); // Reseta mensagens de erro anteriores

      // Caso o campo de pesquisa esteja vazio, buscamos todos os livros
      if (!searchQuery.trim()) {
        setResults([]); // Limpa os resultados
        setLoading(false); // Finaliza o carregamento
        return; // Sai da função sem buscar livros
      }

      try {
        const books = await searchBooks(searchQuery); // Realiza a busca de livros
        if (books.length === 0) {
          setError('Nenhum livro encontrado.'); // Exibe mensagem de erro se não encontrar livros
        } else {
          setResults(applyFiltersAndSort(books)); // Aplica filtros e ordenação
        }
      } catch (error) {
        setError(`Erro ao buscar livros: ${error.message}`); // Exibe erro em caso de falha
        console.error('Erro ao buscar livros:', error); // Loga o erro
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchBooks(); // Executa a função para buscar os livros
  }, [searchQuery, filter, sortOrder]); // Dependências: busca, filtro e ordenação

  // Função para aplicar filtros e ordenação aos livros
  const applyFiltersAndSort = (books) => {
    let filteredBooks = [...books]; // Cria uma cópia dos livros

    // Aplica filtro de categoria
    if (filter) {
      filteredBooks = filteredBooks.filter(book =>
        book.categories && book.categories.includes(filter) // Filtra livros pela categoria
      );
    }

    // Aplica a ordenação
    if (sortOrder) {
      filteredBooks.sort((a, b) => {
        if (sortOrder === 'date') return new Date(b.publishedDate) - new Date(a.publishedDate); // Ordena por data
        if (sortOrder === 'title') return a.title.localeCompare(b.title); // Ordena por título
        return 0; // Retorna 0 se nenhum critério de ordenação for atendido
      });
    }
    return filteredBooks; // Retorna os livros filtrados e ordenados
  };

  return (
    <div className="book-search-container">
      {/* Filtros e controles de ordenação */}
      <div className="filter-sort-controls">
        <select onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
          <option value="">Todos</option>
          <option value="Fiction">Ficção</option>
          <option value="Nonfiction">Não Ficção</option>
          <option value="Science">Ciência</option>
          {/* Outras opções de categoria */}
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)} className="sort-dropdown">
          <option value="">Ordenar por</option>
          <option value="title">Título</option>
          <option value="date">Data de Publicação</option>
        </select>
      </div>

      {loading && <p>Carregando...</p>} {/* Indicador de carregamento */}
      {error && <p className="error-message">{error}</p>} {/* Mensagem de erro */}

      {/* Exibe os livros encontrados */}
      <div className="search-results">
        {results.length > 0 ? (
          results.map((book) => (
            <BookItem key={book.id} book={book} /> // Exibe cada livro usando o componente BookItem
          ))
        ) : (
          !loading && <p className="no-results">Nenhum livro encontrado.</p> // Mensagem caso não haja resultados
        )}
      </div>
    </div>
  );
};

export default BookSearch; // Exporta o componente BookSearch para uso em outros componentes
