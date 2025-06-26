import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BASE_URL } from '@env';

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNABORTED') {
            console.error('⛔ Request timeout');
        }

        if (!error.response) {
            console.error('❌ Network Error:', error.message);
            return Promise.reject({
                message: 'Network error. Please check your internet connection.',
            });
        }

        const { status, data } = error.response;

        switch (status) {
            case 400:
                console.warn('🔸 Bad Request:', data);
                break;
            case 401:
                console.warn('🔒 Unauthorized:', data);
                break;
            case 403:
                console.warn('⛔ Forbidden:', data);
                break;
            case 404:
                console.warn('🔍 Not Found:', data);
                break;
            case 422:
                console.warn('📝 Validation Error:', data);
                break;
            case 500:
                console.warn('💥 Server Error:', data);
                break;
            default:
                console.warn(`⚠️ Unhandled Error [${status}]:`, data);
        }

        return Promise.reject({
            status,
            errors: data ?? null,
        });
    }
);

export default apiClient;
