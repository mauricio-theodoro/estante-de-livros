// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import BookSearch from './components/BookSearch';
import NavBar from './components/NavBar';
import './styles/App.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="App">
        <NavBar onSearch={(query) => setSearchQuery(query)} />
        <Routes>
          <Route path="/" element={<BookShelf />} />
          <Route path="/search" element={<BookSearch searchQuery={searchQuery} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
