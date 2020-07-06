import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from '../../myAxios/config/axios-config';
import FormSearch from "../formSearch";
import withAuth from '../auth/withAuth';
import Header from '../../components/header';


// props: lawsuitEntities, onDeleteLawsuitEntity, onSearch, onClickReset, loggedInEmployee


const AllLawsuitEntities = (props) =>{


    const [deleteInfo, setDeleteInfo] = useState({
        show: false,
        info: "",
        cases: []
    });


    const renderPersonCompanyField = (lawsuitEntity) =>{
        if (lawsuitEntity.company)
            return <td>Company</td>;
        else
            return <td>Person</td>
    };

    const renderDeleteMessage = () =>{
        if(deleteInfo.show){
            return(
                <div>
                    <p>{deleteInfo.info}</p>
                    {deleteInfo.cases.map((c,kluc) =>
                        <p key={kluc}>{c}</p>
                    )}
                </div>
            )
        }
        else{
            return <div/>
        }
    };

    const deleteLawsuitEntity = (id) =>{
        axios.delete("/lawsuit-entities/"+id,{
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("id_token")
            }
        }).then(resp => {

            if (!resp.data) {
                setDeleteInfo({
                    show: true,
                    info: "Cannot delete this lawsuit entity, it is a part of the following cases:",
                    cases: setCasesToDeleteInfo(id)
                })
            }
            else {
                props.onDeleteLawsuitEntity(id);
            }


        })
    };

    const setCasesToDeleteInfo = (id) =>{
        let rez = [];

        let le = props.lawsuitEntities.filter(le =>{
            return le.id === id
        });

        le[0].casesPlaintiff.forEach(c =>{
            rez.push(c.name)
        });

        le[0].casesSued.forEach(c =>{
            rez.push(c.name)
        });

        return rez
    };

    // callback on <Header>
    const logOut = () => {
        props.history.replace('/');     // pri klik na logout redirect na login
    }

    return(
        <div>
            <Header onLogOut={logOut}
                        loggedInEmployee={props.loggedInEmployee}/>
            <FormSearch onSearch={props.onSearch}
                        onClickReset={props.onClickReset}/>
            <br/>

            <h2>All registered lawsuit entities:</h2>

            <br/>
                <Link to={{
                    pathname: "/lawsuitEntities/add",
                    redirectPath: "/allLawsuitEntities"
                }}>
                     <button id={"button"} className={"btn"}>Add new lawsuit entity</button>
                </Link>
            <br/><br/>

            <table id='cases-table' className={"table table-hover"}>
                <thead className={"thead-light"}>
                    <tr>
                        <th>Name</th>
                        <th>Person/Company</th>
                        <th>EMBG/EMBS</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.lawsuitEntities.map((le,kluc) =>
                        <tr key={kluc}>
                            <td>{le.name}</td>
                            {renderPersonCompanyField(le)}
                            <td>{le.emb}</td>
                            <td>
                                <Link to={{
                                    pathname: "/lawsuitEntities/edit/"+le.id,
                                    theLawsuitEntity: le
                                }}>
                                    <button id={"tableBtn"} className={"btn"}>Edit</button>
                                </Link>

                                <button onClick={() =>deleteLawsuitEntity(le.id)}
                                        id={"tableBtn"} className={"btn"}>Delete</button>

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {renderDeleteMessage()}
        </div>
    )
};


export default withAuth(AllLawsuitEntities);