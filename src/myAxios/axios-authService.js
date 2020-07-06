//import React from 'react';
import axios from './config/axios-config';


const authService = {

    registerNewUser: (firstName, lastName, username, password, role) => {
        axios.post('/register',null,{
            params:{
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
                "role": role
            }
        })
    },

    confirmOldPassword: (username, password) => {
        return axios.post('/confirmPassword', null, {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "username": username,
                "password": password
            }
        })
    },

    changeCredentialsOfEmployee: (employeeId,username,password) =>{

        return axios.put("/changeCredentials/"+employeeId,null,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "username": username,
                "password": password
            }
        })
    }
}

export default authService;