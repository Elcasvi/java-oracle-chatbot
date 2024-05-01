import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:51122";

const api = axios.create({
    baseURL: API_BASE_URL,
});

export class taskServices{

    async getAllByUserId() {
        try {
            const response = await api.get("/tasks/{usersId}/tasks");
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

    async update(){
        try {

        } catch (error) {
            console.error("Error fetching task", error)
        }
    }
}