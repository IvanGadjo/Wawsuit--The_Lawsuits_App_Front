import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ChildCaseDetails from "./childCaseDetails";
import lawsuitEntitiesService from '../../myAxios/axios-lawsuitEntitiesService'


// props: allCases, parentCase, onDeleteCase


const CaseDetails = (props) =>{

    const defaultOption = "Child case";



    const [selectedChildCase, setChildCase]=useState({
        caseNumber: 0,
        name: "tmp name",
        createdAt: "tmp date",
        basis: "tmp basis",
        value:"tmp value",
        executed: false,
        proxy: "tmp proxy",
        phase: "tmp phase",
        id: 0
    });


    const [casePlaintiff, setPlaintiff] = useState({
        id: 0
    });

    const [caseSued, setSued] = useState({
        id: 0
    });


    useEffect(() => {

        
        lawsuitEntitiesService.getPlaintiffOfCase(props.parentCase.id).then(resp =>{
            setPlaintiff(resp.data)
        });

        
        lawsuitEntitiesService.getSuedOfCase(props.parentCase.id).then(resp =>{
            setSued(resp.data)
        });

    },[]);



    const showChildCase = () =>{
      if (selectedChildCase.name === "tmp name"){
          return <tr/>
      }
      else{

          return <ChildCaseDetails childCase={selectedChildCase}
                                   colapseCallback={colapseChildCase}
                                   onDeleteCase={props.onDeleteCase}
                                   shouldHaveCollapseButton={true}/>
      }
    };


    const onSelect = (e) =>{
        let selectedCase = props.allCases.filter(c =>{
            return c.name === e.value
        });

        setChildCase(selectedCase[0]);
    };

    const loadChildCasesNames = (parentCaseId) =>{
        let menuOptions = [];

        props.allCases.filter(c =>{
            if (c.parentCase != null && parentCaseId == c.parentCase.id){
                menuOptions.push(c.name)
            }
        });

        return menuOptions;
    };

    const colapseChildCase = () =>{

        // sets the child case to default values because showChildCase() renders the child case comp
        // based on this value
        setChildCase({
            caseNumber: 0,
            name: "tmp name",
            createdAt: "tmp date",
            basis: "tmp basis",
            value:"tmp value",
            executed: false,
            proxy: "tmp proxy",
            phase: "tmp phase",
            id: 0
        })
    };

    const renderPlaintiff = () =>{

        if (casePlaintiff === undefined)
            return <td/>;
        else
            return <td>{casePlaintiff.name}</td>
    };

    const renderSued = () =>{
        if (caseSued === undefined)
            return <td/>;
        else
            return <td>{caseSued.name}</td>;
    };



    //console.log(props.allCases);
    //console.log(props.parentCase);


    //console.log(props.parentCase.name,"---",casePlaintiff.name);


    return(

        <tbody>

            <tr>
                <td>{props.parentCase.caseNumber}</td>
                <td>{props.parentCase.name}</td>
                <td>{props.parentCase.createdAt.substr(0,10)+" "
                        +props.parentCase.createdAt.substr(11,8)}</td>
                <td>{props.parentCase.basis}</td>
                <td>{props.parentCase.value}</td>
                <td>{props.parentCase.executed.toString()}</td>
                <td>{props.parentCase.proxy}</td>

                {renderPlaintiff()}
                {renderSued()}

                <td>

                    <Link to={{
                        pathname: "/employees/"+props.parentCase.id,
                        caseId: props.parentCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>All Employees</button>
                    </Link>

                    <Link to={{
                        pathname: "/employees/add/"+ props.parentCase.id,
                        caseId: props.parentCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>Add new employee</button>
                    </Link>
                </td>
                <td>
                    <Link to={{
                        pathname: "/documents/"+props.parentCase.id,
                        caseId: props.parentCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>All documents</button>
                    </Link>

                    <Link to={{
                        pathname: "/documents/add/"+props.parentCase.id,
                        caseId: props.parentCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>Add document</button>
                    </Link>
                </td>
                <td>{props.parentCase.phase}</td>
                <td>
                    <Link to={{
                        pathname: "/cases/edit/"+props.parentCase.id,
                        theCase: props.parentCase,
                    }}>
                        <button id={"tableBtn"} className={"btn"}>Edit</button>
                    </Link>

                    <button onClick={()=>props.onDeleteCase(props.parentCase.id)}
                            id={"tableBtn"} className={"btn"}>Delete</button>

                    <Dropdown options={loadChildCasesNames(props.parentCase.id)} onChange={onSelect} value={defaultOption} placeholder="Child cases" />
                </td>
            </tr>

            {showChildCase()}

        </tbody>


    )

};

export default CaseDetails;