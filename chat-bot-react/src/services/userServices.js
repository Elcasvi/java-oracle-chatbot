export class userServices {
    baseUrl = "http://localhost:8001/api";
  
    getAll() {
      return fetch(this.baseUrl + "/users")
        .then(response => response.json())
        .then(data => data.data);
    }
  }
  