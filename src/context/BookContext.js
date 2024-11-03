// src/context/BookContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchBooks } from '../services/bookService';

// Cria o contexto
export const BookContext = createContext();

// Provedor de contexto
export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]); // Estado para livros
  const [favoriteBooks, setFavoriteBooks] = useState([]); // Estado para livros favoritos
  const [filteredBooks, setFilteredBooks] = useState([]); // Estado para livros filtrados

  // Carrega os livros ao montar o componente
  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = await fetchBooks();
      setBooks(allBooks); // Define os livros no estado
      setFilteredBooks(allBooks); // Define os livros filtrados inicialmente como todos os livros
    };
    loadBooks();
  }, []);

  // Persistência dos livros favoritos em localStorage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    setFavoriteBooks(storedFavorites); // Define os livros favoritos a partir do localStorage
  }, []);

  // Atualiza localStorage quando os favoritos mudam
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favoriteBooks)); // Armazena os favoritos no localStorage
  }, [favoriteBooks]);

  // Função para alternar o status de favorito de um livro
  const handleFavoriteToggle = (book) => {
    setFavoriteBooks((prevFavorites) => {
      return prevFavorites.find((favBook) => favBook.id === book.id)
        ? prevFavorites.filter((favBook) => favBook.id !== book.id) // Remove o livro se já é favorito
        : [...prevFavorites, book]; // Adiciona o livro como favorito
    });
  };

  return (
    <BookContext.Provider value={{ books, filteredBooks, favoriteBooks, handleFavoriteToggle }}>
      {children} {/* Renderiza os filhos do provedor */}
    </BookContext.Provider>
  );
};
