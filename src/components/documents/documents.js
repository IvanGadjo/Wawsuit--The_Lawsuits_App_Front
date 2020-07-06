import React,{useState,useEffect} from "react";
import axios from 'axios'
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import withAuth from '../auth/withAuth';
import Header from '../../components/header';


//props: theCaseId, onDelete, loggedInEmployee

// fixme: Only works with pdf files

const Documents = (props) =>{

    const [docsInfo,setDocs] = useState({
        docs:[
            {
                id: 0,
                name: "TMP doc",
                archiveNumber: 0,
                input: true,
                documentDate: "TMP Date",
                fileType: "TMP FileType",
                employeeCreatorName: "TMP Creator",
                downloadUrl: "-no download url-"
            }
        ]
    });

    useEffect(()=>{
        //debugger;
        axios({
            method:"get",
            url: "http://localhost:8080/documents/ofCase/"+ props.theCaseId,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp =>{
            setDocs({
                docs:resp.data
            })
        })
    },[]);


    const downloadDocument = (name,url) =>{

        //console.log(name,url);

        axios({
            url: url,
            method: "get",
            responseType: 'blob',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                // 'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then((resp)=>{
            console.log(resp.data);
            const url = window.URL.createObjectURL(new Blob([resp.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
        })

    };

    const deleteDocument = (id) =>{
        props.onDelete(id);
        props.history.push("/cases")
        //console.log(id)
    };

    // callback on <Header>
    const logOut = () => {
        props.history.replace('/');     // pri klik na logout redirect na login
    }



    console.log(props);

    return(
        <div>
            <Header onLogOut={logOut}
                        loggedInEmployee={props.loggedInEmployee}/>
                         
            <table id={"cases-table"} className={"table table-hover"}>
                <thead className={"thead-light"}>
                    <tr>
                        <th>(Doc id)</th>
                        <th>name:</th>
                        <th>archive number:</th>
                        <th>is input:</th>
                        <th>date created:</th>
                        <th>file type:</th>
                        <th>created by:</th>
                        <th>actions:</th>
                    </tr>
                </thead>
                <tbody>
                    {docsInfo.docs.map((di,kluc)=>
                        <tr key={kluc}>
                            <td>{di.id}</td>
                            <td>{di.name}</td>
                            <td>{di.archiveNumber}</td>
                            <td>{di.input.toString()}</td>
                            <td>{di.documentDate}</td>
                            <td>{di.fileType}</td>
                            <td>{di.employeeCreatorName}</td>


                            <td>
                                <div className={"btn-group-vertical"}>
                                    <button onClick={() =>downloadDocument(di.name,di.downloadUrl)}
                                            value={di.downloadUrl}
                                            id={"tableBtn"} className={"btn"}>Download document</button>
                                    <Link to={{
                                        pathname: "/documents/edit/"+di.id,
                                        theDocumentInfo: di,
                                        theCaseId: props.theCaseId
                                    }}>
                                        <button id={"tableBtn"} className={"btn"}>Edit this document</button>
                                    </Link>

                                    <button onClick={() => deleteDocument(di.id)}
                                            id={"tableBtn"} className={"btn"}>Delete</button>

                                    <Link to={{
                                        pathname: "/documents/transfer/"+di.id,
                                        theDocumentInfo: di,
                                        thisCaseId: props.theCaseId
                                    }}>
                                        <button id={"tableBtn"} className={"btn"}>Transfer to another case</button>
                                    </Link>
                                </div>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};


export default withRouter(withAuth(Documents));