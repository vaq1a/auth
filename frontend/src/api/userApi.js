import axios from "axios";

axios.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if(!token) return config;

    config.headers.common['Authorization'] = `Bearer ${token}`;

    return config;
    }, (error) => {
    return Promise.reject(error)
});

export const userApi = {
    signIn: async (data) => {
        return await axios.post('/login', data).then(response => response.data);
    },

    signUp: async (data) => {
        return axios.post('/registration', data).then(response => response.data);
    },

    getAll: async () => {
        return axios.get("/getAll").then(response => response.data);
    }
}