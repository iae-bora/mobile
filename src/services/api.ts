import axios from 'axios';
import { API_URL } from '@env';

const api = axios.create({
    baseURL: `${API_URL}/v0`
});

export default api;