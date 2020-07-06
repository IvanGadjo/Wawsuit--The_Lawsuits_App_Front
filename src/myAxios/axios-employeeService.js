import axios from './config/axios-config';


const employeeService = {

    loadEmployees: () => {
        return axios.get('/employees',{
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        });
    },

    editBasicEmployeeInfo: (editedEmployee,oldId) =>{

        return axios.put('/employees/'+oldId, null, {
            headers : {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "firstName": editedEmployee.firstName,
                "lastName": editedEmployee.lastName,
                "role": editedEmployee.role
            }
        })
    },

    getAllEmployeesOfCase: (caseId) =>{
        return axios.get(`/employees/ofCase/${caseId}`,{
            headers:{
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },
    
    searchEmployees: (term) =>{
        return axios.get("/employees/search/"+term,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    }
}


export default employeeService;