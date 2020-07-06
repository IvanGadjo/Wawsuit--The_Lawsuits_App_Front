import React, {useState} from "react";
import {Link, withRouter} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import withAuth from '../auth/withAuth';
import Header from '../../components/header';

// props: onEditDocument, theDocumentInfo, theCaseId, courts, loggedInEmployee

// fixme: When editing a doc, the createdBy field also changes to the editor. Maybe it should stay as before

const EditDocument = (props) => {


    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedOption, setSelectedOpt] = useState(props.courts[0].id);

    const handleOptionChange = (e) =>{
        setSelectedOpt(e.target.value);
    };


    const onFormSubmit = (formData) =>{
        //formData.preventDefault();

        const editedDoc = {
          "archiveNumber": formData.doc_archiveNumber,
          "isInput": formData.doc_isInput,
          "documentDate": formData.doc_date,
          "employeeId": props.loggedInEmployee.id,
          "courtId": selectedOption,
          "caseId": props.theCaseId
        };

        const oldId = props.theDocumentInfo.id;

        //console.log(formData.doc_date+1)

        console.log(editedDoc)
        props.onEditDocument(editedDoc,oldId);

        setTimeout(()=>{props.history.push("/documents/"+props.theCaseId)},1000);  // time needed to execute queries in db
        //props.history.push("/documents/"+props.theCaseId);

    };

    // callback on <Header>
    const logOut = () => {
        props.history.replace('/');     // pri klik na logout redirect na login
    }


    // render() {
        return(
            <div className={"container-fluid"}>

                <Header onLogOut={logOut}
                        loggedInEmployee={props.loggedInEmployee}/>
            

                <h3>Edit the info for {props.theDocumentInfo.name}</h3>
                <br/>

                <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                    <label htmlFor={"doc_archiveNumber"} className={"smallText"}>New archive number:</label>
                    <input type={"text"} name={"doc_archiveNumber"}
                           defaultValue={props.theDocumentInfo.archiveNumber}
                           ref={register({
                               required: true,
                               pattern:{
                                   value: /^[0-9]*$/,
                               }
                           })}/>
                    {errors.doc_archiveNumber && errors.doc_archiveNumber.type === "required" &&
                    <p className={"validationErrorText"}>Archive number is required!</p>}
                    {errors.doc_archiveNumber && errors.doc_archiveNumber.type === "pattern" &&
                    <p className={"validationErrorText"}>Must only contain numbers!</p>}
                    <br/><br/>

                    <input type={"checkbox"} name={"doc_isInput"} defaultChecked={props.theDocumentInfo.input}
                    ref={register()}/>
                    Is this document an input document to our company?
                    <br/><br/>

                    <label htmlFor="doc_date" className={"smallText"}>New input date:</label>
                    <div>
                        <input type="date" name={"doc_date"} id="doc_date_id"
                               ref={register({
                                   required: true
                               })}/>
                        {errors.doc_date && <p className={"validationErrorText"}>Date is required!</p>}
                    </div>
                    <br/><br/>


                    {props.courts.map((c,kluc) =>
                        <div key={kluc}>
                        <input type={"radio"}
                               //id={c.id}
                               name={"court"}
                               value={c.id}
                               defaultChecked={selectedOption === c.id}
                               onChange={handleOptionChange}

                        />

                        <label htmlFor={"court"}>{c.name}</label>
                        </div>
                    )}

                    <button type="submit" className={"btn"} id={"button"}>Submit</button>
                    <button type={"reset"} className={"btn"} id={"button"}>Reset</button>
                    <Link to={"/documents/"+props.theCaseId}>
                        <button className={"btn"} id={"button"}>Cancel</button>
                    </Link>
                </form>
            </div>
        )
    // }
};


export default withRouter(withAuth(EditDocument));