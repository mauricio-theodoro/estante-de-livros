// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import BookSearch from './components/BookSearch';
import NavBar from './components/NavBar';
import './styles/App.css';

const App = () => {
  // Estado para armazenar a pesquisa atual e a lista de livros favoritos
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState([]);

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
        <NavBar onSearch={setSearchQuery} />
        <Routes>
          <Route 
            path="/" 
            element={<BookShelf onFavoriteToggle={handleFavoriteToggle} favoriteBooks={favoriteBooks} />} 
          />
          <Route path="/search" element={<BookSearch searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
