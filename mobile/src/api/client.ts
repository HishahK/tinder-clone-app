import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Change to your machine's IP for device testing
const API_TOKEN = 'YOUR_SANCTUM_API_TOKEN'; // Generate this via a login endpoint in a real app

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export default apiClient;