import React, {Component, useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import withAuth from '../auth/withAuth';
import Header from '../../components/header';


// props: onEditLawsuitEntity, theLawsuitEntity, loggedInEmployee


const EditLawsuitEntity = (props) =>{


    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedOption, setSelectedOpt] = useState("option1");

    const handleOptionChange = (e) =>{
        setSelectedOpt(e.target.value);
    };

    // callback on <Header>
    const logOut = () => {
        props.history.replace('/');     // pri klik na logout redirect na login
    }

    const onFormSubmit = (formData) =>{
        //formData.preventDefault();
        //console.log(formData)
        let person = true;
        if (selectedOption === "option1"){
            person = false;
        }

        const editedLawsuitEntity = {
            "name": formData.lawsuitEntity_name,
            "emb": formData.lawsuitEntity_emb,
            "isCompany": person
        };

        //console.log(editedLawsuitEntity);
        //debugger;

        props.onEditLawsuitEntity(editedLawsuitEntity,props.theLawsuitEntity.id);

        setTimeout(()=>{props.history.push("/allLawsuitEntities")},1000);  // time needed to execute queries in db
        //props.history.push("/allLawsuitEntities");

    };

    return(
        <div className={"container-fluid"}>
            <Header onLogOut={logOut}
                        loggedInEmployee={props.loggedInEmployee}/>
                <h3>Edit the {props.theLawsuitEntity.name} lawsuit entity</h3>

                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <label htmlFor={"lawsuitEntity_name"} className={"smallText"}>Name:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_name"} name={"lawsuitEntity_name"}
                           defaultValue={props.theLawsuitEntity.name}
                           ref={register({
                               required: true
                           })}/>
                    {errors.lawsuitEntity_name && <p className={"validationErrorText"}>Name is required!</p>}
                    <br/><br/>

                    <label htmlFor={"lawsuitEntity_emb"} className={"smallText"}>EMBG/EMBS:</label>
                    <br/>
                    <input type={"text"} id={"lawsuitEntity_emb"} name={"lawsuitEntity_emb"}
                           defaultValue={props.theLawsuitEntity.emb}
                           ref={register({
                               required: true,
                               pattern:{
                                   value: /^[0-9]*$/,
                               }
                           })}/>
                    {errors.lawsuitEntity_emb && errors.lawsuitEntity_emb.type === "required" &&
                    <p className={"validationErrorText"}>The embg/embs is required!</p>}
                    {errors.lawsuitEntity_emb && errors.lawsuitEntity_emb.type === "pattern" &&
                    <p className={"validationErrorText"}>Must only contain numbers!</p>}
                    <br/><br/>

                    <label>Is the lawsuit entity a person or a company?</label>
                    <br/>

                    <input type={"radio"}
                           id={"type_person"}
                           name={"type"}
                           value={"option1"}
                           checked={selectedOption === "option1"}
                           onChange={handleOptionChange}
                    />
                    <label htmlFor={"type_person"}>Person</label>

                    <input type={"radio"}
                           id={"type_company"}
                           name={"type"}
                           value={"option2"}
                           checked={selectedOption === "option2"}
                           onChange={handleOptionChange}
                    />
                    <label htmlFor={"type_company"}>Company</label>

                    <br/><br/><br/>


                    <div>
                        <button type="submit" className={"btn"} id={"button"}>Submit</button>

                        <button type="reset" className={"btn"} id={"button"}>Reset</button>

                        <Link to={"/allLawsuitEntities"}>
                            <button className={"btn"} id={"button"}>Cancel</button>
                        </Link>
                    </div>

                    <br/>

                </form>
            </div>
    )

};

export default withRouter(withAuth(EditLawsuitEntity));