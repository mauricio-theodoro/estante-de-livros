// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa componentes do React Router
import BookShelf from './components/BookShelf'; // Importa o componente da estante de livros
import BookSearch from './components/BookSearch'; // Importa o componente de busca de livros
import Favorites from './components/Favorites'; // Importa o novo componente de favoritos
import NavBar from './components/NavBar'; // Importa a barra de navegação
import './styles/App.css'; // Importa o CSS para a aplicação

const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); // Estado para armazenar a pesquisa atual
  const [favoriteBooks, setFavoriteBooks] = useState([]); // Estado para armazenar a lista de livros favoritos

  // Função para alternar o status de favorito de um livro
  const handleFavoriteToggle = (book) => {
    setFavoriteBooks((prevFavorites) => {
      return prevFavorites.find((favBook) => favBook.id === book.id)
        ? prevFavorites.filter((favBook) => favBook.id !== book.id) // Remove dos favoritos
        : [...prevFavorites, book]; // Adiciona aos favoritos
    });
  };

  return (
    <Router>
      <div className="App">
        <NavBar onSearch={setSearchQuery} /> {/* Barra de navegação com busca */}
        <Routes>
          <Route 
            path="/" 
            element={<BookShelf onFavoriteToggle={handleFavoriteToggle} favoriteBooks={favoriteBooks} />} 
          />
          <Route path="/search" element={<BookSearch searchQuery={searchQuery} />} />
          <Route path="/favorites" element={<Favorites favoriteBooks={favoriteBooks} onFavoriteToggle={handleFavoriteToggle} />} /> {/* Rota para a página de favoritos */}
        </Routes>
      </div>
    </Router>
  );
};

export default App; // Exporta o componente
