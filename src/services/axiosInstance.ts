import axios from 'axios';
import { PUBLIC_ROUTES } from '@constants/ROUTES';

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_BASE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!PUBLIC_ROUTES.includes(config.url!)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // If status is 401, attempt to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAuthToken();
        localStorage.setItem('authToken', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  },
);

const refreshAuthToken = async () => {
  const response = await axiosInstance.post('/auth/refresh-token');
  return response.data.token;
};

export default axiosInstance;
