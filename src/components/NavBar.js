// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Estante de Livros</h1>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          className="navbar-search-input"
        />
      </div>
    </nav>
  );
};

export default Navbar;
