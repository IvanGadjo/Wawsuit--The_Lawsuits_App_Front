import React from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import { useForm } from 'react-hook-form'



// props loggedInEmployee, onChangeEmployeeCredentials

// fixme: problemot e pri stavanje na nov username, se povikuva loadAllEmpsFromDB, na ovoj request se desava doFilterInternal
//  od filterot na spring. Tuka pagja bidejki vo filterot go zema username od requestot i usernameto e staroto, pa
//  ne se sovpagja so novoto i se desava exception
//  => frkata e sto go zema username od tokenot, a tokenot e so stariot username bidejki e generiran pri log in
//  => 1. resenie - naprai nov request kon login apito za da generiras nov token (NE MOZE - dozvoleno e samo eden req kon /login)
//  => 2. resenie - naprai (na backend) requestot za changeCredentials da ti vrakja nov token



const EditCredentials = (props) =>{

    const { register, handleSubmit, errors } = useForm(); // initialise the hook


    const onFormSubmit = (formData) =>{
        //formData.preventDefault();

        const username = formData.emp_username;
        const password = formData.emp_password;


        // prvin ova no bez load new emps
        props.onChangeEmployeeCredentials(props.loggedInEmployee.id,username,password);

        props.history.push("/home")
    };


        return(
            <div>
                <h4>Set new username and password</h4>
                <form onSubmit={handleSubmit(onFormSubmit)}>

                    <label htmlFor={"emp_username"} className={"smallText"}>New username:</label><br/>
                    <input type={"text"} defaultValue={props.loggedInEmployee.username}
                           name={"emp_username"}
                           ref={register({
                               required: true
                           })}/><br/>
                    {errors.emp_username && <p className={"validationErrorText"}>A username is required!</p>}

                    <label htmlFor={"emp_password"} className={"smallText"}>New password:</label><br/>
                    <input type={"text"} name={"emp_password"}
                           ref={register({
                               required: true
                           })}/><br/><br/>
                    {errors.emp_password && <p className={"validationErrorText"}>Password is required!</p>}

                    <button type={"submit"} className={"btn"} id={"button"}>Submit</button>
                    <button type={"reset"} className={"btn"} id={"button"}>Reset</button>
                    <Link to={"/home"}>
                        <button className={"btn"} id={"button"}>Cancel</button>
                    </Link>
                </form>
            </div>
        )


};

export default withRouter(EditCredentials);