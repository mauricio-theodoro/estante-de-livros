import React from 'react'; // Importa React
import BookItem from './BookItem'; // Importa o componente de item de livro
import '../styles/BookShelf.css'; // Importa o CSS da estante de livros

// Componente BookShelf que exibe livros favoritos e livros organizados por estante
const BookShelf = ({ onFavoriteToggle, favoriteBooks, books, onShelfChange }) => {
  // Filtra os livros por estante
  const currentlyReading = books.filter(book => book.shelf === "currentlyReading");
  const wantToRead = books.filter(book => book.shelf === "wantToRead");
  const read = books.filter(book => book.shelf === "read");

  return (
    <div className="book-shelf">
      <h2>Favoritos</h2>
      {favoriteBooks.length === 0 && <p>Nenhum livro favoritado ainda.</p>} {/* Mensagem quando não há favoritos */}
      <div className="favorites-grid">
        {favoriteBooks.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={true} // Indica que este livro é um favorito
            onShelfChange={onShelfChange} // Passa a função de mudança de estante
          />
        ))}
      </div>

      <h2>Estante de Livros</h2>
      <div className="book-list">
        {/* Seções para os livros de acordo com a estante */}
        <h3>Estou Lendo</h3>
        {currentlyReading.length === 0 && <p>Nenhum livro na estante "Estou Lendo".</p>}
        {currentlyReading.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favoriteBooks.some((favBook) => favBook.id === book.id)} // Verifica se o livro é favorito
            onShelfChange={onShelfChange} // Passa a função de mudança de estante
          />
        ))}

        <h3>Quero Ler</h3>
        {wantToRead.length === 0 && <p>Nenhum livro na estante "Quero Ler".</p>}
        {wantToRead.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favoriteBooks.some((favBook) => favBook.id === book.id)}
            onShelfChange={onShelfChange} // Passa a função de mudança de estante
          />
        ))}

        <h3>Já Lido</h3>
        {read.length === 0 && <p>Nenhum livro na estante "Já Lido".</p>}
        {read.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favoriteBooks.some((favBook) => favBook.id === book.id)}
            onShelfChange={onShelfChange} // Passa a função de mudança de estante
          />
        ))}
      </div>
    </div>
  );
};

export default BookShelf; // Exporta o componente
