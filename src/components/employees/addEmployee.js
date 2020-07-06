import React,{Component} from "react";
import EmployeeCheckboxes from "../employees/employeeCheckboxes";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import withAuth from '../auth/withAuth';
import Header from '../header';

// props: theCaseId, employees, addEmployeesToCase(), loggedInEmployee

class addEmployee extends Component {


    constructor() {
        super();

        this.state={
            employeesToBeAdded: []
        }
    }


    // callback on <Header>
    logOut = () => {
        this.props.history.replace('/');     // pri klik na logout redirect na login
    }


    // callback for employeesCheckboxes component, adds emp ids to state
    selectedEmployeesChange = (selectedEmployees) =>{
        this.setState({
            employeesToBeAdded: selectedEmployees
        })
    };

    onFormSubmit = (e) =>{
        e.preventDefault();

        //console.log(this.state.employeesToBeAdded);

        this.props.onAddNewEmployeesToCase(this.state.employeesToBeAdded,this.props.theCaseId);

        this.props.history.push("/cases")
    };


    render() {
        return(
          <div>
              <Header onLogOut={this.logOut}
                        loggedInEmployee={this.props.loggedInEmployee}/>
              <form onSubmit={this.onFormSubmit} noValidate>

                  <EmployeeCheckboxes allEmployees={this.props.employees}
                                      onSelectedEmployeesChange={this.selectedEmployeesChange}/>
                  <br/><br/>


                  <div>
                      <button type="submit" className={"btn"} id={"button"}>Save</button>
                      <Link to={"/cases"}>
                          <button className={"btn"} id={"button"}>Cancel</button>
                      </Link>
                      <button type="reset" className={"btn"} id={"button"}>Reset</button>
                  </div>
              </form>
          </div>
        );
    }

}

export default withRouter(withAuth(addEmployee));