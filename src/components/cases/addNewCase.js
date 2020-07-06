import React, {useState} from "react";
import {Link} from "react-router-dom";
import {withRouter} from 'react-router-dom';
import EmployeeCheckboxes from "../employees/employeeCheckboxes";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useForm } from 'react-hook-form';
import withAuth from '../auth/withAuth';
import Header from '../header';


// props: employees, cases, lawsuitEntities, onAddNewCase, loggedInEmployee


const AddNewCase = (props) => {

    const { register, handleSubmit, errors } = useForm(); // initialise the hook

    const [showProxyInputField, setShowProxyInputField] = useState(false);
    const [employeesOfCase, setEmployeesOfCase] = useState([]);
    const [plaintiff, setPlaintiff] = useState({
        id: "/"
    });
    const [sued, setSued] = useState({
        id: "/"
    });
    const [parentCase, setParentCase] = useState({
        id: "/"
    });
    const [proxy, setProxy] = useState({
        id: "/"
    });


    // callback on <Header>
    const logOut = () => {
        props.history.replace('/');     // pri klik na logout redirect na login
    }

    // to be shown if a proxy is needed
    const renderProxyInputField = () => {

        if(showProxyInputField)
           return(
            //    <div>
            //        <form onSubmit={saveProxy} noValidate>
            //            <label htmlFor="case_proxy" className={"smallText"}>Proxy:</label><br/>
            //            <input type="text" name={"case_proxy"} id="case_proxy_val" placeholder=""/>&nbsp;
            //            <button type="submit">Save proxy</button>
            //            <p className={"alert alert-danger alert-dismissible fade show"}>Note: You should save the proxy after typing in the name</p>
            //        </form>
            //    </div>
                <div>
                       <label htmlFor="case_proxy" className={"smallText"}>Proxy:</label><br/>
                       <input type="text" name={"case_proxy"} id="case_proxy_val" placeholder=""
                                onChange={handleProxyChange}/>&nbsp;
               </div>
           );
        else
            return <div/>
    };

    const handleProxyChange = (e) =>{
        //console.log(e.target.value);
        setProxy(e.target.value);
    }

    const showProxyInputFieldMethod = (e) =>{
        e.preventDefault();
        // this.setState({
        //     showProxyInputField: true
        // })
        setShowProxyInputField(true);
    };


    // const saveProxy = (pr) =>{
    //     pr.preventDefault();
    //     //console.log(pr.target.case_proxy.value)
    //     // this.setState({
    //     //     proxy:pr.target.case_proxy.value
    //     // })
    //     setProxy(pr.target.case_proxy.value);
    // };

    const loadParentCasesNames = () =>{
        let menuOptions = [];
        menuOptions.push("NONE");
        props.cases.filter((c)=>{
            return c.parentCase == null;
        }).forEach(c =>{
            menuOptions.push(c.name)
        });

        return menuOptions;
    };

    // callback for employeesCheckboxes component, adds emp ids to state
    const selectedEmployeesChange = (selectedEmployees) =>{
        // this.setState({
        //     employeesOfCase: selectedEmployees
        // })
        setEmployeesOfCase(selectedEmployees);
    };

    // loads options for dropdowns for plaintiff and sued
    const loadLawsuitEntitiesNames = () =>{
        let menuOptions = [];
        props.lawsuitEntities.forEach(le =>{
            menuOptions.push(le.name)
        });
        // console.log(menuOptions);
        return menuOptions;
    };



    const onSelectPlaintiff = (e) =>{
        let plaintiffName = e.value;
        //console.log(plaintiffName)

        let plaintiffs = props.lawsuitEntities.filter(le =>{
            return le.name === plaintiffName
        });

        //console.log(plaintiffs[0]);

        //console.log(e)
        // this.setState({
        //     plaintiff: plaintiffs[0]
        // })
        setPlaintiff(plaintiffs[0]);
    };
    const onSelectSued = (e) =>{
        let suedName = e.value;

        let sueds = props.lawsuitEntities.filter(le =>{
            return le.name === suedName
        });

        //console.log(sueds[0]);

        //console.log(e)
        // this.setState({
        //     sued: sueds[0]
        // })
        setSued(sueds[0]);
    };
    const onSelectParentCase = (e) =>{
        let caseName = e.value;

        if (caseName !== "NONE") {

            let parentCases = props.cases.filter(c => {
                return c.name === caseName
            });

            // this.setState({
            //     parentCase: parentCases[0]
            // })
            setParentCase(parentCases[0]);
        }
    };


    const onFormSubmit = (formData) =>{
      //formData.preventDefault();

      let theProxy;
      if (proxy.id == "/")
          theProxy = "/";
      else
          theProxy = proxy;

      const newCase = {
            caseNumber: formData.case_num,
            name: formData.case_name,
            basis: formData.case_basis,
            value: formData.case_val,
            phase: formData.case_phase,
            isExecuted: false,
            parentCaseId: parentCase.id,
            plaintiffId: plaintiff.id,
            suedId: sued.id,
            createdBy: props.loggedInEmployee.id,
            proxy: theProxy,
            employeesToAdd: employeesOfCase        // this goes in a separate axios request
      };

        console.log(newCase)

        props.onAddNewCase(newCase);

        setTimeout(()=>{props.history.push("/cases")},4000);  // time needed to execute queries in db
        //window.location.reload();           // fixme: This must be used in order to properly add a case - with the
                                            // fixme: async config of the spring boot app
        
    };



        return(
            <div className={"container-fluid"}> 

                    <Header onLogOut={logOut}
                        loggedInEmployee={props.loggedInEmployee}/>

                <form onSubmit={handleSubmit(onFormSubmit)}>

                    <h4>Add new case</h4>

                    <div className={"form-group"}>
                    <label htmlFor="case_num" className={"smallText"}>Case number:</label>
                    <div>
                        <input type="text" name={"case_num"} id="case_num_id" placeholder=""
                               ref={register({
                                   required: true,
                                   pattern:{
                                       value: /^[0-9]*$/,
                                   }
                               })}/>
                        {errors.case_num && errors.case_num.type === "required" &&
                        <p className={"validationErrorText"}>Case number is required!</p>}
                        {errors.case_num && errors.case_num.type === "pattern" &&
                        <p className={"validationErrorText"}>Must only contain numbers!</p>}
                    </div>
                    </div>


                    <div className={"form-group"}>
                    <label htmlFor="case_name" className={"smallText"}>Case name:</label>
                    <div>
                        <input type="text" name={"case_name"} id="case_name_id" placeholder=""
                               ref={register({
                                   required: true
                               })}/>
                        {errors.case_name && errors.case_name.type === "required" &&
                        <p className={"validationErrorText"}>Name is required!</p>}
                    </div>
                    </div>

                    <div className={"form-group"}>
                    <label htmlFor="case_basis" className={"smallText"}>Basis:</label>
                    <div>
                        <textarea name={"case_basis"} id="case_basis_id" placeholder=""
                                  ref={register({
                                      required: true
                                  })}/>
                        {errors.case_basis && errors.case_basis.type === "required" &&
                        <p className={"validationErrorText"}>Basis is required!</p>}
                    </div>
                    </div>

                    <div className={"form-group"}>
                    <label htmlFor="case_val" className={"smallText"}>Value of case:</label>
                    <div>
                        <input type="text" name={"case_val"} id="case_val_id" placeholder=""
                               ref={register({
                                   required: true,
                                   pattern:{
                                       value: /^[0-9]*$/,
                                   }
                               })}/>
                        {errors.case_val && errors.case_val.type === "required" &&
                        <p className={"validationErrorText"}>Value of the case is required!</p>}
                        {errors.case_val && errors.case_val.type === "pattern" &&
                        <p className={"validationErrorText"}>Must only contain numbers!</p>}
                    </div>
                    </div>


                    <div className={"form-group"}>
                    <label htmlFor="case_phase" className={"smallText"}>Phase:</label>
                    <div>
                        <input type="text" name={"case_phase"} id="case_phase_id" placeholder=""
                               ref={register({
                                   required: true
                               })}/>
                        {errors.case_phase && errors.case_phase.type === "required" &&
                        <p className={"validationErrorText"}>Phase is required!</p>}
                    </div>
                    </div>





                    <div className={"form-group"}>
                    <label className={"smallText"}>Select employees for the case:</label>
                    <EmployeeCheckboxes allEmployees={props.employees}
                                        onSelectedEmployeesChange={selectedEmployeesChange}/>
                    </div>



                    <div className={"container-fluid"}>
                        <div className={"row"}>
                            <div className={"col-2"}>
                                <div className={"form-group"}>
                                    <label htmlFor="case_parentCase" className={"smallText"}>Parent case:</label>
                                    <div>
                                        <Dropdown options={loadParentCasesNames()}
                                                  onChange={onSelectParentCase}
                                                  value={"parentCase"}
                                                  placeholder={"parent case"}
                                                  id={"parent_case_id"}
                                        />

                                    </div>
                                </div>



                                <div className={"form-group"}>
                                <label htmlFor="case_plantiff" className={"smallText"}>Plaintiff:</label>
                                <div>
                                    <Dropdown options={loadLawsuitEntitiesNames()}
                                              onChange={onSelectPlaintiff}
                                              value={"plaintiff"}
                                              placeholder={"plaintiffs"}
                                              id={"case_plaintiff"}
                                    />
                                    <Link to={{
                                        pathname: "/lawsuitEntities/add",
                                        redirectPath: "/cases/add"
                                    }}>
                                        <button className={"btn"} id={"button"}>Add new plaintiff</button><br/>
                                    </Link>
                                </div>
                                </div>


                                <div className={"form-group"}>
                                    <label htmlFor="case_sued" className={"smallText"}>Sued:</label>
                                    <div>
                                        <Dropdown options={loadLawsuitEntitiesNames()}
                                                  onChange={onSelectSued}
                                                  value={"sued"}
                                                  placeholder={""}
                                                  id={"case_sued"}
                                        />
                                        <Link to={{
                                            pathname: "/lawsuitEntities/add",
                                            redirectPath: "/cases/add"
                                        }}>
                                            <button className={"btn"} id={"button"}>Add new sued</button>
                                        </Link>
                                    </div>
                                    <br/>
                                </div>
                            </div>

                        <div className={"col-10"}></div>
                        </div>
                    </div>
                    

                    
                    <div>
                        <button onClick={showProxyInputFieldMethod}
                                className={"btn"} id={"button"}>Add a proxy</button>
                        {renderProxyInputField()}
                    </div>



                    <div>
                        <button type="submit" className={"btn"} id={"button"}>Save</button>
                        <Link to={"/cases"}>
                            <button className={"btn"} id={"button"}>Cancel</button>
                        </Link>
                        <button type="reset" className={"btn"} id={"button"}>Reset</button>
                    </div>

                </form>

            </div>
        )

};

export default withAuth(withRouter(AddNewCase));