//import React from 'react';
import axios from './config/axios-config';


const casesService = {

    loadCases: ()=>{

        return axios.get('/cases', {
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    searchCase: (term) =>{
        return axios.get("/cases/search/"+term, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    addNewCase: (newCase) => {

        return axios.post("/cases",null,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                 "caseNumber": newCase.caseNumber,
                 "name": newCase.name,
                 "basis": newCase.basis,
                 "value": newCase.value,
                 "phase": newCase.phase,
                 "isExecuted": newCase.isExecuted,
                 "parentCaseId": newCase.parentCaseId,
                 "plaintiffId": newCase.plaintiffId,
                 "suedId": newCase.suedId,
                 "createdBy": newCase.createdBy,
                 "proxy": newCase.proxy
            }
        })
     },

     addEmployeesToCase: (employees,caseId) =>{

        const employeesString = employees.reduce((totalStr,emp)=>{
            return totalStr+","+emp;
        });

        axios.post("/cases/addEmployees/" + caseId, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            },
            params: {
                "employeeIds": employeesString
            }
        })
    },

    deleteCase: (caseId) =>{
        return axios.delete(`/cases/${caseId}`,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    removeEmployeesFromCase: (employees, caseId) =>{

        const employeesString = employees.reduce((totalStr,emp)=>{
            return totalStr+","+emp;
        });

        return axios.put(`/cases/removeEmployees/${caseId}`, null,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            },
            params: {
                "employeeIds": employeesString
            }
        })
    },

    moveDocsBetweenCases: (docs, caseId) =>{
        const docsString = docs.reduce((totalStr,d)=>{
            return totalStr+","+d;
        });

        return axios.put("/cases/moveDocs",null,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            },
            params: {
                "idTo": caseId,
                "documentIds": docsString
            }
        })
    },

    editCase: (editedCase, oldCaseId) =>{
        return axios.put("/cases/"+oldCaseId, null,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "caseNumber": editedCase.caseNumber,
                "name": editedCase.name,
                "basis": editedCase.basis,
                "value": editedCase.value,
                "phase": editedCase.phase,
                "isExecuted": editedCase.isExecuted,
                "plaintiffId": editedCase.plaintiffId,
                "suedId": editedCase.suedId,
                "createdBy": editedCase.createdBy,
                "proxy": editedCase.proxy
            }
        })
    },
}

export default casesService;