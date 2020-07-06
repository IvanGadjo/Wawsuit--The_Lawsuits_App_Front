import React, {useState} from "react";
import {Link, withRouter} from "react-router-dom";
import authService from '../../myAxios/axios-authService'
import { useForm } from 'react-hook-form'


const RegisterNewUser = (props) =>{


    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [selectedOption,setSelectedOption] = useState("option1");
    const [username,setUsername] = useState("");
    const [password,setPass] = useState("");

    // for radio buttons
    const handleOptionChange = (e) =>{
        setSelectedOption(e.target.value);
    };

    // for username and pass
    const handleChange = (e) =>{                // stava vo state username i password
        if (e.target.name == "username"){
            setUsername(e.target.value);
        }
        else {
            setPass(e.target.value);
        }
    };


    const handleFormSubmit = (e) =>{
        //e.preventDefault();

        let role = '';
        if (selectedOption === "option1")
            role = 'supervisor';
        else
            role = 'lawyer';

        (async function registerTheUser() {
            await authService.registerNewUser(e.firstName,e.lastName,username,password,role);    
            props.history.push('/');
        }());    
        //authService.registerNewUser(e.firstName,e.lastName,username,password,role);    

        // axios.post("http://localhost:8080/register",null,{
        //     headers:{
        //         "Access-Control-Allow-Origin": "*",
        //         'Content-Type': 'application/json'
        //     },
        //     params:{
        //         "firstName": e.firstName,
        //         "lastName": e.lastName,
        //         "username": username,
        //         "password": password,
        //         "role": role
        //     }
        // }).then(
        //     props.history.push('/login')
        // )
    };


        return(
            <div className={"container-fluid"}>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <h4>Register new user</h4>

                    <label htmlFor={'firstName'} className={"smallText"}>First name:</label>
                    <div>
                        <input type='text' name={'firstName'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.firstName && <p className={"validationErrorText"}>First name is required!</p>}
                    </div>

                    <label htmlFor={'lastName'} className={"smallText"}>Last name:</label>
                    <div>
                        <input type='text' name={'lastName'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.lastName && <p className={"validationErrorText"}>Last name is required!</p>}
                    </div>


                    <label htmlFor={'username'} className={"smallText"}>Username:</label>
                    <div>
                        <input type='text' name={'username'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.username && <p className={"validationErrorText"}>A username is required!</p>}
                    </div>

                    <label htmlFor={'password'} className={"smallText"}>Password:</label>
                    <div>
                        <input type='text' name={'password'} onChange={handleChange}
                               ref={register({
                                   required: true
                               })}/>
                        {errors.password && <p className={"validationErrorText"}>Password is required!</p>}
                    </div>


                    <label>Are you a supervisor/lawyer?</label>
                    <br/>

                    <input type={"radio"}
                           id={"type_supervisor"}
                           name={"type"}
                           value={"option1"}
                           checked={selectedOption === "option1"}
                           onChange={handleOptionChange}
                    />
                    <label htmlFor={"type_supervisor"}>Supervisor</label>

                    <input type={"radio"}
                           id={"type_lawyer"}
                           name={"type"}
                           value={"option2"}
                           checked={selectedOption === "option2"}
                           onChange={handleOptionChange}
                    />
                    <label htmlFor={"type_lawyer"}>Lawyer</label>

                    <div>
                        <input type='submit' className={'form-submit btn'} value={'submit'}
                               id={"button"}/>

                        <button type={"reset"} className={"btn"} id={"button"}>Reset</button>

                        <Link to={"/login"}>
                            <button className={"btn"} id={"button"}>Cancel</button>
                        </Link>
                    </div>


                </form>
            </div>
        )


};

export default withRouter(RegisterNewUser);