import axios from "axios";

export class userServices {
    baseUrl = "http://localhost:7001";
  
    getAll() {
        return axios.get(this.baseUrl+"/users").then(res=>{
            return res.data
        })

    }

  }
  