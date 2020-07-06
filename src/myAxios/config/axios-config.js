import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Credentials":"true",
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'Authorization',
        'Content-Type': 'application/json',                 // moras tokenot da go dodavas posebno na sekoj axios req
        // 'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
    }
});


export default instance;

