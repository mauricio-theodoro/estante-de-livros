import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import BookSearch from './components/BookSearch';
import NavBar from './components/NavBar'; // Certifique-se de que o nome está correto
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Usar o nome correto aqui */}
        <Routes>
          <Route path="/" element={<BookShelf />} />
          <Route path="/search" element={<BookSearch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
