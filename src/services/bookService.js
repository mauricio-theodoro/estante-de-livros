import axios from 'axios';

const API_URL = 'https://api-books-dot-api-samples-423102.uc.r.appspot.com/api'; 
const AUTH_TOKEN = 'Bearer 03112024';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: AUTH_TOKEN,
    Accept: 'application/json',
  },
});

const handleError = (error) => {
  if (error.response) {
    console.error('Response error:', error.response.data);
    throw new Error(`Error ${error.response.status}: ${error.response.data}`);
  } else if (error.request) {
    console.error('No response received:', error.request);
    throw new Error('No response received from the server');
  } else {
    console.error('Error setting up request:', error.message);
    throw new Error('Error setting up the request');
  }
};

// Função para buscar todos os livros
export const fetchBooks = async () => {
  try {
    const response = await apiClient.get('/books');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Função para buscar livros com termo de pesquisa
export const searchBooks = async (query) => {
  try {
    const response = await apiClient.get(`/books/search`, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};
