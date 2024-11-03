import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookShelf from './components/BookShelf';
import BookSearch from './components/BookSearch';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<BookShelf />} />
          <Route path="/search" element={<BookSearch />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
