import axios from "axios";

//const API_BASE_URL = "https://oketasksservice.sanchezapps.net/";
const API_BASE_URL = "http://127.0.0.1:62941";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default class taskServices{

    async getall(){
        const response = await api.get(`/tasks`);
        return response.data
    }

    async getAllByUserId(userId) {
        try {
            const response = await api.get(`/tasks/${userId}/tasks`);
            return response.data;
        } catch (error) {
            console.error("Error fetching all tasks:", error);
            throw error; 
        }
    }

    async getById(){
        try{
            const response = await api.get("/tasks/{taskId}")
            return response.data;
        } catch (error) {
            console.error("Error fetching task", error);
            throw error;
        }
    }

    async update(state){
        try {
            const response = await api.post(``, state);
            return response.data
        } catch (error) {
            console.error("Error fetching task", error)
        }
    }

    async create(task){
        try {
            const response = await api.post(`/task`,task);
            return response.data
        } catch (error) {
            console.error("Error en create task", error)
        }
    }
}