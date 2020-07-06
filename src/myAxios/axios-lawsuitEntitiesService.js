import axios from './config/axios-config';


const lawsuitEntitiesService = {

    loadLawsuitEntities: ()=>{

        return axios.get('/lawsuit-entities',{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    getPlaintiffOfCase: (caseId) =>{
        return axios.get(`http://localhost:8080/cases/getPlaintiff/${caseId}`,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    getSuedOfCase: (caseId) =>{
        return axios.get(`http://localhost:8080/cases/getSued/${caseId}`,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    addNewLawsuitEntity: (newLawsuitEntity)=>{

        return axios.post("/lawsuit-entities",null,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "name": newLawsuitEntity.name,
                "emb": newLawsuitEntity.emb,
                "isCompany": newLawsuitEntity.isCompany
            }
        })
    },

    editLawsuitEntity: (editedLawsuitEntity, oldId) =>{

        return axios.put("/lawsuit-entities/"+oldId,null,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "name": editedLawsuitEntity.name,
                "emb": editedLawsuitEntity.emb,
                "isCompany": editedLawsuitEntity.isCompany
            }
        })

    },


    // functionality implemented with hook, <AllLawsuitEntities> comp
    deleteLawsuitEntity: (id) =>{
        
        return axios.delete("/lawsuit-entities/"+id,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    searchLawsuitEntities: (term) =>{
        return axios.get("/lawsuit-entities/search/"+term,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    }
}

export default lawsuitEntitiesService;