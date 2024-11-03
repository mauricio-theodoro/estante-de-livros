import React, { useState, useEffect } from 'react';
import BookItem from './BookItem';
import './SearchPage.css'; // Certifique-se de que o CSS está separado

const SearchPage = ({ addBookToShelf }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            setBooks([]);
            return;
        }

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();

            if (data.items) {
                setBooks(data.items);
                setError('');
            } else {
                setBooks([]);
                setError('Nenhum livro encontrado.');
            }
        } catch (err) {
            setError('Erro ao buscar livros. Tente novamente.');
        }
    };

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-page">
            <h1>Buscar Livros</h1>
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Digite o título do livro ou autor..."
            />
            <button onClick={handleSearch}>Buscar</button>
            {error && <p className="error-message">{error}</p>}
            <div className="books-list">
                {books.map((book) => (
                    <BookItem key={book.id} book={book} addBookToShelf={addBookToShelf} />
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
