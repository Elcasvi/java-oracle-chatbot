import axios from "axios";

const API_BASE_URL = "https://okeusers.sanchezapps.net/";
//const API_BASE_URL = "http://127.0.0.1:62918";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default class userServices {

    async login(email, password) {
        try {
            const response = await api.post(`/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
            return response.data;
        } catch (error) {
            console.error("Login error:", error);
            throw error; // Permitir que el componente maneje el error
        }
    }

    async getAllMangerProjects(userId){
        try {
            const response = await api.get(`/users/getProjects/${userId}`)
            return response;
        } catch (error) {
            console.error("Error fetching projects: ", error);
            throw error;
        }
    }
    
  
    async getAll() {
        try {
            const response = await api.get(`/users`);
            return response.data;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error; // Re-throw para manejarlo más arriba si es necesario
        }
    }

    
    
    async getByEmail(email) {
        try {
            const response = await api.get(`/users/search/byEmail?email=${encodeURIComponent(email)}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error; 
        }
    }

    async getById(userId) {
        try {
            const response = await api.get(`/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        }
    }



}
  