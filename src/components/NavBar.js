// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Lida com mudanças no campo de entrada de pesquisa
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Lida com o envio da pesquisa ao clicar no botão
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query); // Passa o valor da pesquisa para o App
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Estante de Livros</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
      </div>
      <form onSubmit={handleSearchSubmit} className="navbar-search-form">
        <input
          type="text"
          placeholder="Buscar livro..."
          value={query}
          onChange={handleSearchChange}
          className="navbar-search-input"
        />
        <button type="submit" className="navbar-search-button">Buscar</button>
      </form>
    </nav>
  );
};

export default Navbar;
