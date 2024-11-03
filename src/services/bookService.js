// bookService.js
import axios from 'axios';

// URL base da API de livros
const API_URL = 'https://api-books-dot-api-samples-423102.uc.r.appspot.com/api';
// Token de autorização para acesso à API
const AUTH_TOKEN = 'Bearer 03112024';

// Configuração padrão do Axios
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: AUTH_TOKEN, // Cabeçalho de autorização
    Accept: 'application/json', // Aceita respostas em formato JSON
  },
});

// Função para lidar com erros de requisição
const handleError = (error) => {
  let errorMessage = 'Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.';
  
  // Verifica se a resposta do servidor está disponível
  if (error.response) {
    // O servidor respondeu com um status fora do range 2xx
    errorMessage = `Erro ${error.response.status}: ${error.response.data.message || 'Erro ao processar sua solicitação.'}`;
    console.error('Response error:', errorMessage); // Loga o erro da resposta
  } else if (error.request) {
    // A requisição foi feita, mas não houve resposta
    errorMessage = 'Não foi possível obter uma resposta do servidor.';
    console.error('No response received:', error.request); // Loga a requisição
  } else {
    // Alguma outra coisa aconteceu durante a configuração da requisição
    console.error('Error setting up request:', error.message); // Loga o erro de configuração
  }

  throw new Error(errorMessage); // Lança um erro com a mensagem amigável
};

// Função para buscar todos os livros
export const fetchBooks = async () => {
  try {
    const response = await apiClient.get('/books'); // Requisição para buscar todos os livros
    // Validação do formato da resposta
    if (!Array.isArray(response.data)) {
      throw new Error('Esperava-se um array de livros.');
    }
    return response.data; // Retorna a lista de livros
  } catch (error) {
    handleError(error); // Chama a função para lidar com erros
  }
};

// Função para buscar livros com termo de pesquisa
export const searchBooks = async (query) => {
  // Retorna um array vazio se a consulta estiver vazia
  if (!query) return []; 

  try {
    // Requisição para buscar livros com base no termo de pesquisa
    const response = await apiClient.get(`/books/search`, {
      params: { q: query }, // Parâmetro de consulta
    });
    // Validação do formato da resposta
    if (!Array.isArray(response.data)) {
      throw new Error('Esperava-se um array de resultados da busca.');
    }
    return response.data; // Retorna a lista de livros encontrados
  } catch (error) {
    handleError(error); // Chama a função para lidar com erros
  }
};

// Função para obter detalhes de um livro específico
export const getBookDetails = async (bookId) => {
  try {
    // Requisição para obter os detalhes do livro
    const response = await apiClient.get(`/books/${bookId}`);
    return response.data; // Retorna os detalhes do livro
  } catch (error) {
    handleError(error); // Chama a função para lidar com erros
  }
};
