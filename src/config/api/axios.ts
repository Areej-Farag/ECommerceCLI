import axios from "axios";
const BASE_URL = "http://192.168.1.6:4000";

const Client = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
Client.interceptors.request.use(
  (config) => {
    const token = ""; // ممكن بعدين تجيبيه من SecureStorage أو Zustand
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
Client.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Client;
