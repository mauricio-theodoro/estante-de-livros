import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css'; // Estilo da Navbar

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">Estante de Livros</h1>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/search">Search</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
