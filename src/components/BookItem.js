import React, { useState } from 'react'; // Importa React e hook useState
import '../styles/BookItem.css'; // Importa o CSS separado

const BookItem = ({ book, onFavoriteToggle, isFavorite, onShelfChange }) => {
  const [showDescription, setShowDescription] = useState(false); // Estado para exibir descrição

  // Função para lidar com a mudança de estante
  const handleShelfChange = (event) => {
    // Chama a função de mudança de estante passando o livro e a nova estante
    onShelfChange(book, event.target.value);
  };

  return (
    <div className="book-item">
      <img src={book.imageLinks?.thumbnail} alt={book.title} className="book-image" />
      <h3>{book.title}</h3>
      <p>{book.subtitle}</p>
      <p>Authors: {book.authors.join(', ')}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Published Date: {book.publishedDate}</p>

      {/* Botão para mostrar/esconder a descrição */}
      <button
        className="description-button"
        onClick={() => setShowDescription(!showDescription)} // Alterna a descrição
      >
        {showDescription ? 'Hide Description' : 'Show Description'}
      </button>

      {/* Exibe a descrição apenas se showDescription for verdadeiro */}
      {showDescription && (
        <div className="description">
          <p>{book.description}</p>
        </div>
      )}

      <p>Average Rating: {book.averageRating}</p>
      <a href={book.infoLink} target="_blank" rel="noopener noreferrer" className="more-info">
        More Info
      </a>

      {/* Seletor para mudar a estante do livro */}
      <select value={book.shelf} onChange={handleShelfChange}>
        <option value="none" disabled>Mover para...</option>
        <option value="currentlyReading">Estou Lendo</option>
        <option value="wantToRead">Quero Ler</option>
        <option value="read">Já Lido</option>
      </select>

      {/* Botão de Favorito */}
      <button onClick={() => onFavoriteToggle(book)} className="favorite-button">
        {isFavorite ? '★ Favorito' : '☆ Favoritar'}
      </button>
    </div>
  );
};

export default BookItem; // Exporta o componente
