import axios from './config/axios-config';


const documentsService = {


    editDoc: (editedDoc, oldId) =>{
        return axios.put("/documents/"+oldId,null,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
            params:{
                "archiveNumber": editedDoc.archiveNumber,
                "isInput": editedDoc.isInput,
                "documentDate": editedDoc.documentDate,
                "employeeId": editedDoc.employeeId,
                "courtId": editedDoc.courtId,
                "caseId": editedDoc.caseId
            }
        })
    },

    deleteDoc: (id) =>{
        return axios.delete("/documents/"+id,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            }
        })
    },

    uploadDoc: (formData, otherParams) =>{
        return axios.post("/documents/uploadDocument", formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")
            },
            params: {
                "archiveNumber": otherParams.archiveNumber,
                "isInput": otherParams.isInput,
                "documentDate": otherParams.documentDate,
                "employeeId": otherParams.employeeId,
                "courtId":otherParams.courtId,
                "caseId": otherParams.caseId
            }
        });

    }
};


export default documentsService;