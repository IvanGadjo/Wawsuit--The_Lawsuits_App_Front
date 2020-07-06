import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './auth/withAuth';
import Header from './header';

// onEmployeeLogin, loggedInEmployee

class home extends Component {


    logOut = () => {
        this.props.history.replace('/');     // pri klik na logout redirect na login
    }


    componentDidMount(){
        //this.props.onEmployeeLogIn(this.props.user.sub);        // da se naprai get all emps, da se najde koj e logiran i toa da se predade na header
    }

    render(){
        return( 
            <div>   

                <Header onLogOut={this.logOut}
                        loggedInEmployee={this.props.loggedInEmployee}/>

            <h2>Home screen</h2>


            <div className={"container-fluid"}>
                <div className={"col-4"} id={"yourInfoCard"}>
                    <h4>Your info:</h4>


                    <p><span className={"smallText"}>First name:</span> {this.props.loggedInEmployee.firstName}</p>
                    <p><span className={"smallText"}>Last name:</span> {this.props.loggedInEmployee.lastName}</p>
                    <p><span className={"smallText"}>Username:</span> {this.props.loggedInEmployee.username}</p>
                    <p><span className={"smallText"}>Role:</span> {this.props.loggedInEmployee.role}</p>

                    <br/><br/>
                    <Link to={"/editEmployee"}>
                        <button className={"btn"} id={"button"}>Edit info</button>
                    </Link>

                    <Link to={"/confirmOldPassword"}>
                    <button className={"btn"} id={"button"}>Edit credentials</button>
                    </Link>
                </div>
                <div className={"col-8"}></div>
            </div>
            </div>
        )
    }
}

export default withAuth(home);