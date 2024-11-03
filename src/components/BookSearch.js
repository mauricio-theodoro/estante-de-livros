// BookSearch.js
import React, { useEffect, useState } from 'react';
import { searchBooks } from '../services/bookService'; // Importa a função para buscar livros na API
import BookItem from './BookItem'; // Importa o componente para exibir cada livro individualmente
import '../styles/BookSearch.css'; // Importa o CSS específico para este componente

const BookSearch = ({ searchQuery }) => {
  // Estados para armazenar resultados, carregamento, erros, filtro e ordenação
  const [results, setResults] = useState([]); // Armazena os resultados da busca
  const [loading, setLoading] = useState(false); // Exibe o indicador de carregamento
  const [error, setError] = useState(''); // Armazena mensagens de erro
  const [filter, setFilter] = useState(''); // Filtro de categoria
  const [sortOrder, setSortOrder] = useState(''); // Ordem de exibição

  // Função que busca livros sempre que o query ou filtros mudam
  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery.trim()) {
        setResults([]); // Limpa os resultados se a busca estiver vazia
        setError('Digite algo para buscar.'); // Define uma mensagem de erro inicial
        return;
      }

      setLoading(true); // Inicia o estado de carregamento
      setError(''); // Reseta a mensagem de erro anterior

      try {
        const books = await searchBooks(searchQuery); // Faz a chamada à API de busca
        if (books.length === 0) {
          setError('Nenhum livro encontrado.'); // Define mensagem de erro se não houver resultados
        } else {
          setResults(applyFiltersAndSort(books)); // Aplica os filtros e ordenação
        }
      } catch (error) {
        setError('Erro ao buscar livros. Tente novamente.'); // Define mensagem de erro em caso de falha
        console.error('Erro ao buscar livros:', error); // Loga o erro no console para depuração
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    };

    fetchBooks(); // Executa a função de busca
  }, [searchQuery, filter, sortOrder]); // Reexecuta a busca ao mudar o query, filtro ou ordenação

  // Função para aplicar filtros e ordenar os resultados
  const applyFiltersAndSort = (books) => {
    let filteredBooks = [...books];
    
    // Aplica o filtro de categoria se houver
    if (filter) {
      filteredBooks = filteredBooks.filter(book => 
        book.categories && book.categories.includes(filter)
      );
    }
    
    // Ordena os livros com base no critério escolhido
    if (sortOrder) {
      filteredBooks.sort((a, b) => {
        if (sortOrder === 'date') return new Date(b.publishedDate) - new Date(a.publishedDate); // Ordena por data
        if (sortOrder === 'title') return a.title.localeCompare(b.title); // Ordena por título
        return 0;
      });
    }
    return filteredBooks; // Retorna a lista filtrada e ordenada
  };

  return (
    <div className="book-search-container">
      {/* Menu para selecionar filtro de categoria e ordem de exibição */}
      <div className="filter-sort-controls">
        <select onChange={(e) => setFilter(e.target.value)} className="filter-dropdown">
          <option value="">Todos</option>
          <option value="Fiction">Ficção</option>
          <option value="Nonfiction">Não Ficção</option>
          <option value="Science">Ciência</option>
          <option value="Romance">Romance</option>
          <option value="Fantasy">Fantasia</option>
          <option value="Mystery">Mistério</option>
          <option value="Thriller">Suspense</option>
          <option value="Biography">Biografia</option>
          <option value="History">História</option>
          <option value="Poetry">Poesia</option>
          <option value="Adventure">Aventura</option>
          <option value="Horror">Terror</option>
          <option value="Self-Help">Autoajuda</option>
          <option value="Health">Saúde</option>
          <option value="Travel">Viagem</option>
          <option value="Cooking">Culinária</option>
          <option value="Science Fiction">Ficção Científica</option>
          <option value="Philosophy">Filosofia</option>
          <option value="Psychology">Psicologia</option>
          <option value="Religion">Religião</option>
          <option value="Education">Educação</option>
          <option value="Comics">Quadrinhos</option>
          <option value="Art">Arte</option>
          <option value="Drama">Drama</option>
          <option value="Young Adult">Jovem Adulto</option>
          <option value="Children">Infantil</option>
          <option value="Politics">Política</option>
          <option value="Business">Negócios</option>
          <option value="Economics">Economia</option>
          <option value="Technology">Tecnologia</option>
          <option value="Law">Direito</option>
          <option value="Music">Música</option>
          <option value="Sports">Esportes</option>
          <option value="True Crime">Crime Real</option>
          {/* Outros temas podem ser adicionados conforme necessário */}
        </select>
        
        <select onChange={(e) => setSortOrder(e.target.value)} className="sort-dropdown">
          <option value="">Ordenar por</option>
          <option value="title">Título</option>
          <option value="date">Data de Publicação</option>
        </select>
      </div>

      {loading && <p>Carregando...</p>} {/* Indicador de carregamento */}
      {error && <p className="error-message">{error}</p>} {/* Mensagem de erro */}

      {/* Lista de resultados */}
      <div className="search-results">
        {results.map((book) => (
          <BookItem key={book.id} book={book} /> // Renderiza cada livro usando o componente BookItem
        ))}
      </div>
    </div>
  );
};

export default BookSearch; // Exporta o componente BookSearch para ser usado em outras partes do aplicativo
