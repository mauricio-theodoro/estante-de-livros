import axios from 'axios';

const API_URL = 'https://api-books-dot-api-samples-423102.uc.r.appspot.com/api'; // URL da API
const AUTH_TOKEN = '03112024'; // Sua chave de autorização

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
  if (error.response) {
    // O servidor respondeu com um status fora do range 2xx
    console.error('Response error:', error.response.data);
    throw new Error(`Error ${error.response.status}: ${error.response.data}`);
  } else if (error.request) {
    // A requisição foi feita, mas não houve resposta
    console.error('No response received:', error.request);
    throw new Error('No response received from the server');
  } else {
    // Alguma outra coisa aconteceu durante a configuração da requisição
    console.error('Error setting up request:', error.message);
    throw new Error('Error setting up the request');
  }
};

// Função para buscar livros
export const fetchBooks = async () => {
  try {
    const response = await apiClient.get('/books'); // Endpoint específico para buscar livros
    return response.data;
  } catch (error) {
    handleError(error); // Chama a função para lidar com erros
  }
};
