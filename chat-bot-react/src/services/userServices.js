import axios from "axios";

export default class userServices {
    baseUrl = "http://localhost:8001";
  
    getAll() {
        return axios.get(this.baseUrl+"/users").then(res=>{
            return res.data
        })
    };

    login(){
        return axios.post(this.baseUrl+"/login").then(res=>{
            return res.data
        })
    };

    getById(userId){
        return axios.get(this.baseUrl+"/users/${userId}").then(res=>{
            return res.data
        })
    };



}
  