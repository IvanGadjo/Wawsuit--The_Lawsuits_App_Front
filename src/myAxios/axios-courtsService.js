import axios from './config/axios-config'


const courtsService = {

    loadCourts: () =>{
        return axios.get("/courts",{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    }
};


export default courtsService;