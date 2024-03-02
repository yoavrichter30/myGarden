import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080'
    // baseURL: 'https://193.106.55.182',
});

export default apiClient;