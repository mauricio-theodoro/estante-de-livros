import React, { useState, useEffect } from 'react'; // Importa React e hooks
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa componentes do React Router
import BookShelf from './components/BookShelf'; // Importa o componente da estante de livros
import BookSearch from './components/BookSearch'; // Importa o componente de busca de livros
import Favorites from './components/Favorites'; // Importa o componente de favoritos
import NavBar from './components/NavBar'; // Importa a barra de navegação
import { fetchBooks } from './services/bookService'; // Importa a função fetchBooks para buscar livros
import './styles/App.css'; // Importa o CSS para a aplicação

const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a pesquisa atual
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteBooks');
    return savedFavorites ? JSON.parse(savedFavorites) : []; // Recupera favoritos do localStorage
  }); // Estado para armazenar a lista de livros favoritos
  const [books, setBooks] = useState([]); // Estado para armazenar a lista de livros
  const [filteredBooks, setFilteredBooks] = useState([]); // Estado para armazenar livros filtrados

  // Função para alternar o status de favorito de um livro
  const handleFavoriteToggle = (book) => {
    setFavoriteBooks((prevFavorites) => {
      const newFavorites = prevFavorites.find((favBook) => favBook.id === book.id)
        ? prevFavorites.filter((favBook) => favBook.id !== book.id) // Remove dos favoritos
        : [...prevFavorites, book]; // Adiciona aos favoritos
      localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites)); // Salva favoritos no localStorage
      return newFavorites; // Retorna a nova lista de favoritos
    });
  };

  // Função para lidar com a mudança de estante de um livro
  const handleShelfChange = (book, newShelf) => {
    // Atualiza a estante do livro
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((b) => (b.id === book.id ? { ...b, shelf: newShelf } : b));
      localStorage.setItem('books', JSON.stringify(updatedBooks)); // Salva os livros atualizados no localStorage
      return updatedBooks;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query); // Atualiza o estado da consulta de pesquisa

    if (!query) {
      setFilteredBooks(books); // Exibe todos os livros se a consulta estiver vazia
      return;
    }

    // Filtra os livros com base na consulta de pesquisa
    const filtered = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) // Ignora case na busca
    );
    setFilteredBooks(filtered); // Atualiza o estado com os livros filtrados
  };

  // Carrega todos os livros na montagem do componente
  useEffect(() => {
    const loadBooks = async () => {
      const savedBooks = localStorage.getItem('books');
      if (savedBooks) {
        setBooks(JSON.parse(savedBooks)); // Recupera livros do localStorage se existirem
        setFilteredBooks(JSON.parse(savedBooks)); // Inicialmente, todos os livros estão filtrados
      } else {
        const allBooks = await fetchBooks(); // Busca todos os livros da API
        setBooks(allBooks); // Atualiza o estado com todos os livros
        setFilteredBooks(allBooks); // Inicialmente, todos os livros estão filtrados
        localStorage.setItem('books', JSON.stringify(allBooks)); // Salva os livros no localStorage
      }
    };
    loadBooks(); // Chama a função para carregar os livros
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar onSearch={handleSearch} /> {/* Barra de navegação com busca */}
        <Routes>
          <Route 
            path="/" 
            element={
              <BookShelf 
                books={filteredBooks} // Passa os livros filtrados para o componente
                onFavoriteToggle={handleFavoriteToggle} 
                favoriteBooks={favoriteBooks} 
                onShelfChange={handleShelfChange} // Passa a função de mudança de estante
              />} 
          />
          <Route path="/search" element={<BookSearch searchQuery={searchQuery} />} />
          <Route 
            path="/favorites" 
            element={<Favorites favoriteBooks={favoriteBooks} onFavoriteToggle={handleFavoriteToggle} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App; // Exporta o componente
