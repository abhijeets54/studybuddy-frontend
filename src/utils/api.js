import axios from 'axios';

// Use environment variable for API base URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;
          localStorage.setItem('access_token', access);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (userData) => api.post('/auth/register/', userData),
  logout: () => api.post('/auth/logout/'),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/update/', data),
  changePassword: (data) => api.post('/auth/change-password/', data),
};

// Notes API calls
export const notesAPI = {
  getNotes: (params) => api.get('/notes/', { params }),
  getNote: (id) => api.get(`/notes/${id}/`),
  createNote: (data) => api.post('/notes/', data),
  updateNote: (id, data) => api.put(`/notes/${id}/`, data),
  deleteNote: (id) => api.delete(`/notes/${id}/`),
  getSubjects: () => api.get('/notes/subjects/'),
  createSubject: (data) => api.post('/notes/subjects/', data),
  getTags: () => api.get('/notes/tags/'),
  createTag: (data) => api.post('/notes/tags/', data),
  generateWithAI: (data) => api.post('/notes/generate-ai/', data),
};

// Flashcards API calls
export const flashcardsAPI = {
  getDecks: () => api.get('/flashcards/decks/'),
  getDeck: (id) => api.get(`/flashcards/decks/${id}/`),
  createDeck: (data) => api.post('/flashcards/decks/', data),
  updateDeck: (id, data) => api.put(`/flashcards/decks/${id}/`, data),
  deleteDeck: (id) => api.delete(`/flashcards/decks/${id}/`),
  getCards: (deckId) => api.get(`/flashcards/decks/${deckId}/cards/`),
  createCard: (deckId, data) => api.post(`/flashcards/decks/${deckId}/cards/`, data),
  updateCard: (deckId, cardId, data) => api.put(`/flashcards/decks/${deckId}/cards/${cardId}/`, data),
  deleteCard: (deckId, cardId) => api.delete(`/flashcards/decks/${deckId}/cards/${cardId}/`),
  studySession: (deckId, data) => api.post(`/flashcards/decks/${deckId}/study/`, data),
  startStudySession: (deckId) => api.post(`/flashcards/sessions/start/${deckId}/`),
  endStudySession: (sessionId, data) => api.post(`/flashcards/sessions/end/${sessionId}/`, data),
  generateFromNote: (data) => api.post('/flashcards/generate/', data),
  generateFromTopic: (data) => api.post('/flashcards/generate-topic/', data),
};

// Quizzes API calls
export const quizzesAPI = {
  getQuizzes: () => api.get('/quizzes/'),
  getQuiz: (id) => api.get(`/quizzes/${id}/`),
  createQuiz: (data) => api.post('/quizzes/', data),
  updateQuiz: (id, data) => api.put(`/quizzes/${id}/`, data),
  deleteQuiz: (id) => api.delete(`/quizzes/${id}/`),
  takeQuiz: (id) => api.get(`/quizzes/${id}/take/`),
  submitQuiz: (id, data) => api.post('/quizzes/submit/', data),
  getResults: (id) => api.get(`/quizzes/${id}/results/`),
  generateFromNote: (data) => api.post('/quizzes/generate/', data),
  generateFromTopic: (data) => api.post('/quizzes/generate-topic/', data),
};

// Analytics API calls
export const analyticsAPI = {
  getOverview: () => api.get('/analytics/overview/'),
};

export default api;
