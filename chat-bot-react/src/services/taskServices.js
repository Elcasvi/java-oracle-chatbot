import axios from "axios";

export class taskServices{
    baseUrl = "http://localhost:8000";

    getAll() {
        return axios.get(this.baseUrl+"/task").then(res=>{
            return res.data
        })
    };
}