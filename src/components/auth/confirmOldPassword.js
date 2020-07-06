import React, {useState} from "react";
import {Link} from "react-router-dom";
import EditCredentials from "./editCredentials";
import authService from './../../myAxios/axios-authService';
import withAuth from './withAuth';


// props: loggedInEmployee, onChangeEmployeeCredentials

const ConfirmOldPassword = (props) =>{

    const [showEditCredentials,setShowEditCredentials]=useState(false);
    const [showWrongPasswordMsg, setShowWrongPasswordMsg] = useState(false);

    const onFormSubmit = (formData) =>{
        formData.preventDefault();

        authService.confirmOldPassword(props.loggedInEmployee.username, formData.target.old_pass.value)
        .then((resp) => {
            if(resp.data === true){
                setShowEditCredentials(true);
                setShowWrongPasswordMsg(false);
            }
            else{
                setShowEditCredentials(false);
                setShowWrongPasswordMsg(true);
            }
        })
        .catch((err) => {
            setShowWrongPasswordMsg(true)
        })
    }; 


    const renderEditCredentials = () =>{
        if (showEditCredentials === true) {
            return(
                <div>
                    <EditCredentials loggedInEmployee={props.loggedInEmployee}
                                     onChangeEmployeeCredentials={props.onChangeEmployeeCredentials}   />
                </div>
            )
        }
        else{
            return <div/>
        }
    };

    const renderWrongPassMsg = () =>{
        if(showWrongPasswordMsg === true){
            return(
                <div>
                    <p className={'validationErrorText'}>Wrong username or password!</p>
                </div>
            )
        }
        else{
            return <div/>
        }
    }

    return(
        <div>
            <form onSubmit={onFormSubmit} noValidate>
                <br/><br/>
                <label htmlFor={"old_pass"} className={"smallText"}>Confirm old password:</label><br/>
                <input type={"password"} name={"old_pass"}/>

                {renderWrongPassMsg()}

                <button type={"submit"} className={"btn"} id={"button"}>Submit</button>
                <button type={"reset"} className={"btn"} id={"button"}>Reset</button>

                <Link to={"/home"}>
                    <button className={"btn"} id={"button"}>Cancel</button>
                </Link>

                <br/><br/><br/>
            </form>

            {renderEditCredentials()}
        </div>
    )
};

export default withAuth(ConfirmOldPassword);