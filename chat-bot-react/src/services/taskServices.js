import axios from "axios";

export class taskServices{
    baseUrl = "http://127.0.0.1:62107";

    getAll() {
        return axios.get(this.baseUrl+"/task").then(res=>{
            return res.data
        })
    };
}