import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import BookShelf from './components/BookShelf'; 
import BookSearch from './components/BookSearch'; 
import Favorites from './components/Favorites'; 
import NavBar from './components/NavBar'; 
import { fetchBooks } from './services/bookService'; 
import './styles/App.css'; 

const App = () => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteBooks');
    return savedFavorites ? JSON.parse(savedFavorites) : []; 
  });
  const [books, setBooks] = useState([]); 
  const [filteredBooks, setFilteredBooks] = useState([]); 

  const handleFavoriteToggle = (book) => {
    setFavoriteBooks((prevFavorites) => {
      const newFavorites = prevFavorites.find((favBook) => favBook.id === book.id)
        ? prevFavorites.filter((favBook) => favBook.id !== book.id) 
        : [...prevFavorites, book]; 
      localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites)); 
      return newFavorites; 
    });
  };

  const handleShelfChange = (book, newShelf) => {
    setBooks((prevBooks) => {
      const updatedBooks = prevBooks.map((b) => (b.id === book.id ? { ...b, shelf: newShelf } : b));
      localStorage.setItem('books', JSON.stringify(updatedBooks)); 
      return updatedBooks;
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query); 

    if (!query) {
      setFilteredBooks(books); 
      return;
    }

    const filtered = books.filter((book) => {
      return book.title.toLowerCase().includes(query.toLowerCase()) || 
             book.authors.some(author => author.toLowerCase().includes(query.toLowerCase())); 
    });
    setFilteredBooks(filtered); 
  };

  useEffect(() => {
    const loadBooks = async () => {
      const savedBooks = localStorage.getItem('books');
      if (savedBooks) {
        setBooks(JSON.parse(savedBooks)); 
        setFilteredBooks(JSON.parse(savedBooks)); 
      } else {
        const allBooks = await fetchBooks(); 
        setBooks(allBooks); 
        setFilteredBooks(allBooks); 
        localStorage.setItem('books', JSON.stringify(allBooks)); 
      }
    };
    loadBooks(); 
  }, []);

  return (
    <Router>
      <div className="App">
        <NavBar onSearch={handleSearch} /> 
        <Routes>
          <Route 
            path="/" 
            element={
              <BookShelf 
                books={filteredBooks} 
                onFavoriteToggle={handleFavoriteToggle} 
                favoriteBooks={favoriteBooks} 
                onShelfChange={handleShelfChange} 
              />} 
          />
          <Route 
            path="/search" 
            element={
              <BookSearch 
                searchQuery={searchQuery} 
                onShelfChange={handleShelfChange} // Passa a função de mudança de estante
                onFavoriteToggle={handleFavoriteToggle} // Passa a função de toggle de favorito
              />} 
          />
          <Route 
            path="/favorites" 
            element={<Favorites favoriteBooks={favoriteBooks} onFavoriteToggle={handleFavoriteToggle} />} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 
