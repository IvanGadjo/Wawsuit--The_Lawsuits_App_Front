import React,{useState,useEffect} from 'react';
import axios from 'axios'


// props: employeeFirstName, employeeLastName, employeeId

const BasicEmployeeCaseInfo = (props) =>{

    const [employeeCases, setEmployeeCases] = useState({
       cases:[]
    });


    useEffect(()=>{

        //console.log(props.employeeId);

        axios({
            method: "get",
            url: "http://localhost:8080/cases/byEmployeeId/"+props.employeeId,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials":"true",
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            },
        }).then(resp =>{//console.log(resp)

            let casesArray = [];
            let i = 0;
            resp.data.forEach((item)=>{
                casesArray[i++] = item;
            });

            //setEmployeeCases(resp.data);
            setEmployeeCases({
                cases: casesArray
            });
            //console.log(props.employeeId,resp.data)
        })
    },[props.employeeId]);



    return(
        <tr>
            <td>{props.employeeFirstName}</td>
            <td>{props.employeeLastName}</td>
            <td>{props.employeeId}</td>

            <td>
            {employeeCases.cases.map((ec,kluc)=>
                <h6 key={kluc}>{ec}</h6>
            )}
            </td>
        </tr>
    )
};

export default BasicEmployeeCaseInfo;