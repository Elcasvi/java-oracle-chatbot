import axios from "axios";

//const API_BASE_URL = "https://okeusers.sanchezapps.net/";
const API_BASE_URL = "http://127.0.0.1:55923";

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

    async getByEmail(email) {
        try {
            const response = await api.get(`/users/search/byEmail?email=${encodeURIComponent(email)}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error; 
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

    async getUsersOfProject(projectId){
        try {
            const response = await api.get(`/projects/getUsers/${projectId}`)
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId){
        try {
            const response = await api.get(`/users/${userId}`)
            return response
        } catch (error) {
            throw error;
        }
    }

    async asignarUserToProject(userId,projectId){
        try {
            const response = await api.post(`/users/assignUserToProject/${userId}/${projectId}`)
            return response
        } catch (error) {
            throw error;
        }
    }

    async createProject(project) {
        try {
            const response = await api.post(`/projects`,project)
            return response
        } catch (error) {
            throw error;
        }
    }

    async getVersion() {
        try {
            const response = await api.get(`/version`)
            console.log(response)
            return response;
        } catch (error) {
            throw error
        }
    }
}
  