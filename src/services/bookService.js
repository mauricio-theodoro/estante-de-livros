import axios from 'axios';

const API_URL = 'https://api-books-dot-api-samples-423102.uc.r.appspot.com/api';
const AUTH_TOKEN = 'Bearer 03112024';

// Configuração padrão do Axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: AUTH_TOKEN,
    Accept: 'application/json',
  },
});

// Função para lidar com erros de requisição
const handleError = (error) => {
  let errorMessage = 'An unexpected error occurred';
  
  if (error.response) {
    // O servidor respondeu com um status fora do range 2xx
    errorMessage = `Error ${error.response.status}: ${error.response.data.message || error.response.data}`;
    console.error('Response error:', errorMessage);
  } else if (error.request) {
    // A requisição foi feita, mas não houve resposta
    console.error('No response received:', error.request);
  } else {
    // Alguma outra coisa aconteceu durante a configuração da requisição
    console.error('Error setting up request:', error.message);
  }

  throw new Error(errorMessage); // Lança um erro com a mensagem amigável
};

// Função para buscar todos os livros
export const fetchBooks = async () => {
  try {
    const response = await apiClient.get('/books');
    if (!Array.isArray(response.data)) {
      throw new Error('Expected an array of books'); // Validação do formato de resposta
    }
    return response.data; // Retorna a lista de livros
  } catch (error) {
    handleError(error); // Chama a função para lidar com erros
  }
};

// Função para buscar livros com termo de pesquisa
export const searchBooks = async (query) => {
  if (!query) return []; // Retorna um array vazio se a consulta estiver vazia

  try {
    const response = await apiClient.get(`/books/search`, {
      params: { q: query },
    });
    if (!Array.isArray(response.data)) {
      throw new Error('Expected an array of search results'); // Validação do formato de resposta
    }
    return response.data; // Retorna os livros encontrados
  } catch (error) {
    handleError(error); // Chama a função para lidar com erros
  }
};
