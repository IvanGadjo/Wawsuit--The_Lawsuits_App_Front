import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import lawsuitEntitiesService from '../../myAxios/axios-lawsuitEntitiesService'


//props: childCase, colapseCallback, onDeleteCase, shouldHaveCollapseButton


const ChildCaseDetails = (props) =>{


    const [childCasePlaintiff, setChildCasePlaintiff] = useState({});

    const [childCaseSued, setChildCaseSued] = useState({});

    useEffect(() =>{

        lawsuitEntitiesService.getPlaintiffOfCase(props.childCase.id).then(resp =>{

            setChildCasePlaintiff(resp.data)
        });

        lawsuitEntitiesService.getSuedOfCase(props.childCase.id).then(resp =>{

            setChildCaseSued(resp.data)

        });

    },[props.childCase.id]);



    const renderPlaintiff = () =>{
        if (childCasePlaintiff === undefined)
            return <td/>;
        else
            return <td>{childCasePlaintiff.name}</td>
    };

    const renderSued = () =>{
        if (childCaseSued === undefined)
            return <td/>;
        else
            return <td>{childCaseSued.name}</td>;
    };

    const renderCollapseButton = () =>{
      if (props.shouldHaveCollapseButton)
          return (
              <button onClick={props.colapseCallback}>Colapse</button>
          );
      else
          return <div/>
    };


    const renderChildCase = () =>{

        return(
            <tr id={"childCaseDetails"}>
                <td>{props.childCase.caseNumber}</td>
                <td>{props.childCase.name}
                    <br/>
                    <u>Parent case:</u> {props.childCase.parentCase.name}</td>
                <td>{props.childCase.createdAt.substr(0,10)+" "
                            +props.childCase.createdAt.substr(11,8)}</td>
                <td>{props.childCase.basis}</td>
                <td>{props.childCase.value}</td>
                <td>{props.childCase.executed.toString()}</td>
                <td>{props.childCase.proxy}</td>

                {renderPlaintiff()}
                {renderSued()}

                <td>

                    <Link to={{
                        pathname: "/employees/"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>All Employees</button>
                    </Link>

                    <Link to={{
                        pathname: "/employees/add/"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>Add new employee</button>
                    </Link>
                </td>
                <td>
                    <Link to={{
                        pathname: "/documents/"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>All documents</button>
                    </Link>

                    <Link to={{
                        pathname: "/documents/add/"+props.childCase.id,
                        caseId: props.childCase.id
                    }}>
                        <button id={"tableBtn"} className={"btn"}>Add document</button>
                    </Link>
                </td>
                <td>{props.childCase.phase}</td>

                <td>
                    <Link to={{
                        pathname: "/cases/edit/"+props.childCase.id,
                        theCase: props.childCase
                    }}>
                        <button id={"tableBtn"} className={"btn"}>Edit</button>
                    </Link>

                    <button onClick={() => {
                        props.onDeleteCase(props.childCase.id);
                        props.colapseCallback()
                    }} id={"tableBtn"} className={"btn"}>Delete</button>


                    {renderCollapseButton()}

                </td>

            </tr>
        )
    };


    //console.log(props.childCase.name,"---",childCasePlaintiff.name)


    return(
        renderChildCase()
    )
};


export default ChildCaseDetails;