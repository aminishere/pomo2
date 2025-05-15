import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sessions'; // Change if your backend URL is different

// api.js
export const saveSession = async ({ sessionType, duration, completedAt }) => {
  return fetch('http://localhost:5000/api/sessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionType, duration, completedAt })
  }).then(res => res.json());
};


export const fetchSessions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};
