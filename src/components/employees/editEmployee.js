import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import { useForm } from 'react-hook-form';
import withAuth from '../auth/withAuth';

// TODO: Ovaa component se odnesuva na edit na info za userot koj e logiran vo momentot

// props: loggedInEmployee, onEditBasicInfo

const EditEmployee = (props) =>{


    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const onFormSubmit = (formData) =>{
        //formData.preventDefault();

        const editedEmp = {
            "firstName": formData.emp_firstName,
            "lastName": formData.emp_lastName,
            "role": props.loggedInEmployee.role
        };

        console.log(editedEmp);

        props.onEditBasicInfo(editedEmp,props.loggedInEmployee.id);

        setTimeout(()=>{props.history.push("/home")},1000);  // time needed to execute queries in db
        //props.history.push("/home");
    };


        return(
            <div className={"container-fluid"}>
                <h3>Edit your info:</h3>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <label htmlFor={"emp_firstName"} className={"smallText"}>New first name:</label><br/>
                    <input type={"text"} name={"emp_firstName"} defaultValue={props.loggedInEmployee.firstName}
                           ref={register({
                               required: true
                           })}/><br/><br/>
                    {errors.emp_firstName && <p className={"validationErrorText"}>First name is required!</p>}

                    <label htmlFor={"emp_lastName"} className={"smallText"}>New last name:</label><br/>
                    <input type={"text"} name={"emp_lastName"} defaultValue={props.loggedInEmployee.lastName}
                           ref={register({
                               required: true
                           })}/><br/><br/>
                    {errors.emp_lastName && <p className={"validationErrorText"}>Last name is required!</p>}

                    <button type={"submit"} className={"btn"} id={"button"}>Submit</button>
                    <button type={"reset"} className={"btn"} id={"button"}>Reset</button>
                    <Link to={"/home"}>
                        <button className={"btn"} id={"button"}>Cancel</button>
                    </Link>
                </form>
            </div>
        )


};

export default withAuth(withRouter(EditEmployee));
