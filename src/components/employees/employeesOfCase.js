import React,{useState,useEffect} from 'react';
import axios from 'axios';
import withAuth from '../auth/withAuth';
import Header from '../header';
import employeeService from '../../myAxios/axios-employeeService';


// props: theCaseId, onRemoveEmployee, loggedInEmployee

const EmployeesOfCase = (props) =>{


    const [employeesOfCase, setEmployees] = useState({
       emps:[
           {   firstName: "TMP",
               lastName: "TMP lastName",
               username: "TMP usrtmp",
               password: "TMP usrtmppass",
               role: "TMP noRole",
               cases: [],
               createdCases: [],
               documents: [],
               id: 100
           },
           {
               firstName: "KRC",
               lastName: "KRC lastName",
               username: "KRC usrtmp",
               password: "KRC usrtmppass",
               role: "KRC noRole",
               cases: [],
               createdCases: [],
               documents: [],
               id: 101
           }
       ]
    });

    useEffect(()=>{

        employeeService.getAllEmployeesOfCase(props.theCaseId)
        .then((resp)=>{
            //console.log(resp.data)              // ova treba da se procitanite

            let empArray = [];

            let i = 0;
            resp.data.forEach((item)=>{
                empArray[i++]=item;
            });

            //console.log(empArray);

            setEmployees({
                emps: empArray
            })

            //console.log(employeesOfCase)        // ova treba da bide default vrednosti
        })

    },[]);

    // callback on <Header>
    const logOut = () => {
        props.history.replace('/');     // pri klik na logout redirect na login
    }

    const removeEmployeeFromCase = (id) =>{

        // the request sent to the server needs to have an array as a param, hence this:
        let empArray = [id];
        props.onRemoveEmployee(empArray,props.theCaseId);

        setEmployees(prevState => {

            const startIndex = prevState.emps.findIndex(c =>
                c.id === id
            );

            console.log(startIndex)
            console.log(prevState.emps)

            if (startIndex !== -1){
                prevState.emps.splice(startIndex,1);
                const newEmps = prevState.emps;

                console.log(prevState.emps)

                return{
                    emps: newEmps
                }
            }
            else{
                const newEmps = prevState.emps;
                return{
                    emps: newEmps
                }
            }

        })

    };



    //console.log(employeesOfCase);   // ednas gi dava defaultnite, ednas gi dava procitanite

    return (
        <div>

                <Header onLogOut={logOut}
                        loggedInEmployee={props.loggedInEmployee}/>

                {employeesOfCase.emps.map((e,kluc) =>
                    <ul key={kluc}>
                        <li>
                            <ul >
                                <h6>{e.firstName} {e.lastName}</h6>
                                <p>{e.role}</p>
                                <button onClick={() => removeEmployeeFromCase(e.id)}
                                        className={"btn"} id={"button"}>Remove from case</button>
                            </ul>
                        </li>
                    </ul>
                )}


        </div>
    )
};

export default withAuth(EmployeesOfCase);