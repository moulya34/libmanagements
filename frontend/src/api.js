import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchBooks = async () => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const addBook = async (book) => {
  const response = await axios.post(`${API_URL}/books`, book);
  return response.data;
};

export const updateBook = async (id, book) => {
  const response = await axios.put(`${API_URL}/books/${id}`, book);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`${API_URL}/books/${id}`);
  return response.data;
};
