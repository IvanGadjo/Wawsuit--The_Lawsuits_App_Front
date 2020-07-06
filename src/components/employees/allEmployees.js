import React, {Component} from "react";
import { Link } from 'react-router-dom';
import withAuth from '../auth/withAuth';
import Header from '../header';
import BasicEmployeeCaseInfo from "./basicEmployeeCaseInfo";
import FormSearch from "../formSearch";


class allEmployees extends Component{

    logOut = () => {
        this.props.history.replace('/');     // pri klik na logout redirect na login
    }

    render(){
        return(
            <div>
                <Header onLogOut={this.logOut}
                        loggedInEmployee={this.props.loggedInEmployee}/>
                
                <FormSearch onSearch={this.props.onSearch}
                        onClickReset={this.props.onClickReset}
                        className="form-control"/>
            <br/>



            <table id='cases-table' className={"table table-hover"}>
                <thead className={"thead-light"}>
                    <tr>
                        <th>First name:</th>
                        <th>Last name:</th>
                        <th>(Employee id:)</th>
                        <th>Working on:</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.employees.map((e,index) =>
                        <BasicEmployeeCaseInfo employeeFirstName={e.firstName}
                                               employeeLastName={e.lastName}
                                               employeeId={e.id}
                                               key={index}
                        />
                    )}
                </tbody>
            </table>
        </div>
            
        )
    }
}


export default withAuth(allEmployees);