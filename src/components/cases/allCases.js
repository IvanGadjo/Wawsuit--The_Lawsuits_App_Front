import React, {Component} from "react";
import { Link } from 'react-router-dom';
import withAuth from '../auth/withAuth';
import Header from '../header';
import FormSearch from '../formSearch';
import CaseDetails from './caseDetails';
import ChildCaseDetails from './childCaseDetails';


// loggedInEmployee, cases, onDeleteCase, onSearch, onClickReset

class cases extends Component{

    logOut = () => {
        this.props.history.replace('/');     // pri klik na logout redirect na login
    }


    showCasesDetails = () =>{
        const len = this.props.cases.filter((c)=>{
            return c.parentCase == null;
        }).length;

        //console.log(len);

        if (len == 0){
            // render child cases kako obicni cases (se koristi pri search na case koe e child case)
            return (
                <tbody>
                {this.props.cases.map((c,kluc)=>
                    <ChildCaseDetails childCase={c}
                                      colapseCallback={()=>{console.log("colapse not implemented")}}
                                      onDeleteCase={this.props.onDeleteCase}
                                      shouldHaveCollapseButton={false}
                                      key={kluc}/>
                )}
                </tbody>
            )
        }
        else{
            // normalen render
            return(
                this.props.cases.filter((c)=>{
                    return c.parentCase == null;
                }).map((c,kluc)=>
                        <CaseDetails allCases={this.props.cases}
                                     parentCase={c} key={kluc}
                                     onDeleteCase={this.props.onDeleteCase}/>
                                     )
            )
        }
    };

    render(){
        return(   
            <div>   
                <Header onLogOut={this.logOut}
                        loggedInEmployee={this.props.loggedInEmployee}/>

                
                <FormSearch onSearch={this.props.onSearch}
                                onClickReset={this.props.onClickReset}
                                className="form-control"/>

                <br/>

                <h2>Cases:</h2>

                {/* <Link to={"/cases/add"}>
                    <button id={"button"} className={"btn"}>Add new case</button>
                </Link> */}
                <Link to={{
                    pathname: '/cases/add',
                    
                }}>
                   <button id='button' className='btn'>Add new case</button> 
                </Link>

                <div id={"childCasesMsg"}>* Child cases are blue colored</div>

                <table id={"cases-table"} className={"table table-hover"}>
                    <thead className={"thead-light"}>
                        <tr>

                                <th>Case number</th>
                                <th>Case name</th>
                                <th>Created at</th>
                                <th>Basis</th>
                                <th>Value</th>
                                <th>Is executed</th>
                                <th>Proxy</th>
                                <th>Plaintiff</th>
                                <th>Sued</th>
                                <th>Employees on <br/>this case</th>
                                <th>Documents</th>
                                <th>PHASE</th>
                                <th>Actions</th>

                        </tr>
                    </thead>


                    {this.showCasesDetails()}


                </table>
            </div>
        )
    }
}


export default withAuth(cases);