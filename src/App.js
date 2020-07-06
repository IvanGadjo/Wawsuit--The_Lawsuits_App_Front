import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './css/App.css';
import Home from './components/home'
import AllCases from './components/cases/allCases'
import AllEmployees from './components/employees/allEmployees'
import error from './components/error'
import LogIn from './components/auth/logIn'
import registerNewUser from './components/auth/registerNewUser';
import Header from './components/header';
import EditEmployee from './components/employees/editEmployee';
import ConfirmOldPassword from './components/auth/confirmOldPassword';
import AddNewCase from './components/cases/addNewCase';
import EmployeesOfCase from './components/employees/employeesOfCase';
import AddEmployee from './components/employees/addEmployee';
import Documents from './components/documents/documents';
import AddDocument from './components/documents/addDocument';
import EditDocument from './components/documents/editDocument';
import TransferDocument from './components/documents/transferDocument';
import EditCase from './components/cases/editCase';
import AllLawsuitEntities from './components/lawsuitEntities/allLawsuitEntities';
import AddLawsuitEntity from './components/lawsuitEntities/addLawsuitEntity';
import EditLawsuitEntity from './components/lawsuitEntities/editLawsuitEntity';

import employeeService from './myAxios/axios-employeeService';
import authService from './myAxios/axios-authService';
import casesService from './myAxios/axios-casesService';
import lawsuitEntitiesService from './myAxios/axios-lawsuitEntitiesService';
import courtsService from './myAxios/axios-courtsService';
import documentsService from './myAxios/axios-documentsService';
import AuthService from './components/auth/AuthService';

const Auth = new AuthService();


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees : [],
      cases: [],
      loggedInEmployee: {},
      lawsuitEntities: [],
      courts: []
    }

    this.setLoggedInEmployeeInfoToState = this.setLoggedInEmployeeInfoToState.bind(this);
    this.addNewCaseToDB = this.addNewCaseToDB.bind(this);
  }

  componentDidMount() {
    //debugger;
    

    if(Auth.loggedIn()){               
      this.loadAllCasesFromDB();
      this.loadAllLawsuitEntitiesFromDB();
      var username = Auth.getProfile().sub;           // stava loggedInEmp vo state
      this.setLoggedInEmployeeInfoToState(username);
    }
  }



  // FIXME: Go srediv, vekje nema potreba da se desava callback na home bidejki componentDidMount() od ovaa component
  // ja vrsi taa rabota na stavanje na logiran emp vo state i vcituvanje na site potrebni raboti

  // callback na <Home/>
  setLoggedInEmployeeInfoToState(usrnm){

    employeeService.loadEmployees().then(resp =>{

      this.setState( (prevState) => {
        return {
          employees: resp.data
        }
      });

      let res = {};
      this.state.employees.forEach(e =>{
        let empusrnm = e.username;
        if(empusrnm === usrnm) {
          res = e;
        }
      });
      
      this.setState({
        loggedInEmployee: res
      })

      casesService.loadCases().then(resp =>{
        this.setState((prevState) =>{
          return{
            cases: resp.data
          }
        })
      })

      lawsuitEntitiesService.loadLawsuitEntities().then(resp =>{
        this.setState((prevState) =>{
          return{
            lawsuitEntities: resp.data
          }
        })
      })

      courtsService.loadCourts().then(resp =>{
        this.setState((prevState)=>{
          return{
            courts: resp.data
          }
        })
      })
      
    });

    console.log(this.state)
  }

  // callback na <LogIn/>
  onClickLogIn = () =>{
    var username = Auth.getProfile().sub;
    this.setLoggedInEmployeeInfoToState(username);
    return Promise.resolve();
  }

  // Functions for loading stuff from DB directly on start:
  loadAllEmployeesFromDB = () =>{
    employeeService.loadEmployees().then(resp =>{

      this.setState( (prevState) => {
        return {
          employees: resp.data
        }
      });
    });
  };
  loadAllCasesFromDB = () =>{
    casesService.loadCases().then(resp =>{
      this.setState((prevState) =>{
        return{
          cases: resp.data
        }
      })
    })
  };
  loadAllLawsuitEntitiesFromDB = () =>{
    lawsuitEntitiesService.loadLawsuitEntities().then(resp =>{
      //console.log(resp.data)
      this.setState((prevState) =>{
        return{
          lawsuitEntities: resp.data
        }
      })
    })
  }
  loadAllCourtsFromDB = () =>{
    courtsService.loadCourts().then(resp =>{
      this.setState((prevState)=>{
        return{
          courts: resp.data
        }
      })
    })
  };



  // Emps 
  // TODO: Async/await da e, ne so timeout
  editBasicEmployeeInfo = (editedEmployee, oldId)=>{
    employeeService.editBasicEmployeeInfo(editedEmployee,oldId).then(resp =>{
      setTimeout(()=>{this.loadAllEmployeesFromDB()},500);  // time needed to execute queries in db
    })
  };
  changeEmployeeCredentials = (employeeId,username,password) =>{
    authService.changeCredentialsOfEmployee(employeeId,username,password).then(resp=>{

      // TODO: Mozebi ke treba ova da go fixnes
      //this.props.user.sub = username;

      // mora da go trgens tokenot za da projde bez problemi login requestot (ako najde token AuthService pri fetch
      // probuva da go decode - na line 39
      // i ke imas frki)
      localStorage.removeItem("id_token");
      //console.log(resp)
      localStorage.setItem("id_token",resp.data.token);

      this.loadAllEmployeesFromDB()
    })
  };
  searchEmployees = (term) =>{
    employeeService.searchEmployees(term).then(resp =>{
      //console.log(resp.data)
      this.setState({
        employees: resp.data
      })
    })
  };

  // Cases
  deleteCase = (caseId) =>{
    casesService.deleteCase(caseId).then(resp =>{
      this.setState((prevState)=>{

        const startIndex = prevState.cases.findIndex(c =>
          c.id === caseId
        );
        prevState.cases.splice(startIndex,1);
        const newCases = prevState.cases;

        return{
          cases: newCases
        }
      })
    })
  };
  searchCases = (term) =>{
    casesService.searchCase(term).then(resp =>{
      //console.log(resp.data);

      this.setState({
        cases: resp.data
      })
    })
  }
  async addNewCaseToDB (newCase)  {

    let resp = await casesService.addNewCase(newCase);
    await casesService.addEmployeesToCase(newCase.employeesToAdd, resp.data.id);
    debugger;
    console.log(this)
    this.setState({
      cases: [...this.state.cases,resp.data]
    })
  } 
  removeEmployeesFromCase = (employeesToRemove, caseId) =>{
    casesService.removeEmployeesFromCase(employeesToRemove, caseId).then(r =>{
      this.loadAllCasesFromDB();
    });
  };
  addEmployeesToCase = (employeesToAdd, caseId) =>{
    casesService.addEmployeesToCase(employeesToAdd,caseId);
  };
  editCase = (editedCase, oldId) =>{
    casesService.editCase(editedCase,oldId).then(resp =>{
      setTimeout(()=>{this.loadAllCasesFromDB()},500);  // time needed to execute queries in db
      //this.loadAllCasesFromDB();
    })
  };

  // addNewCaseToDB = (newCase) => {
  //   casesService.addNewCase(newCase).then(resp =>{
  //     casesService.addEmployeesToCase(newCase.employeesToAdd, resp.data.id);
  //     this.setState({
  //       cases: [...this.state.cases,resp.data]
  //     })
  //   })
  // } 
  
  // Docs
  deleteDocument = (id) =>{
    documentsService.deleteDoc(id);
  }
  uploadDocument = (formData, otherParams) =>{
    documentsService.uploadDoc(formData, otherParams).then(resp =>{
      this.loadAllCasesFromDB();
    })
  };
  editDocument = (editedDoc, oldId) =>{
    documentsService.editDoc(editedDoc,oldId).then(resp =>{
      setTimeout(()=>{this.loadAllCasesFromDB()},500);  // time needed to execute queries in db
      //this.loadAllCasesFromDB();
    })
  };
  moveDocsBetweenCases = (docs, newCaseId, oldCaseId) =>{
    casesService.moveDocsBetweenCases(docs,newCaseId).then( resp=>{
      this.loadAllCasesFromDB();
    })
  };

  // Lawsuit Entities
  addNewLawsuitEntityToDB = (newLawsuitEntity) =>{
    lawsuitEntitiesService.addNewLawsuitEntity(newLawsuitEntity).then(resp =>{

      this.setState({
        lawsuitEntities: [...this.state.lawsuitEntities,resp.data]
      });
    })
  };
  editLawsuitEntity = (editedLawsuitEntity, oldId) =>{
    lawsuitEntitiesService.editLawsuitEntity(editedLawsuitEntity, oldId).then(resp =>{

      setTimeout(()=>{this.loadAllLawsuitEntitiesFromDB()},500);  // time needed to execute queries in db

      //this.loadAllLawsuitEntitiesFromDB();
    })
  };
  deleteLawsuitEntity = (id) =>{
    this.setState((prevState)=>{
      const startIdx = prevState.lawsuitEntities.findIndex(le => le.id === id);
      prevState.lawsuitEntities.splice(startIdx,1);
      const newLE = prevState.lawsuitEntities;

      return{
        lawsuitEntities: newLE
      }
    })
  };
  searchLawsuitEntities = (term) =>{
    lawsuitEntitiesService.searchLawsuitEntities(term).then(resp =>{
      //console.log(resp.data)
      this.setState({
        lawsuitEntities: resp.data
      })
    })
  };


  render(){
    return ( 


      <div className={"container-fluid"}>     

          {/* App logo & name */}
          <div className={"row"}>
            <div className={"col-10"}>
              <img src={require('./resources/logo_transparent.png')} id={"imgLogo"} alt='wawsuit_logo'/>
              <h2 id={"masterTitle"}>Wawsuit - The Lawsuits App</h2>
            </div>

            <div className={"col-2"}>
                
            </div>
          </div>
                  

          {/* FIXME: So predavanje {...props} na sekoja komponenta koja e vo <Router>
                     i se predavaat propsot od samiot Router kako na pr history,
                     samo vaka mozes da gi koristis istite  */}
          <Router>         
            <Switch>
              <Route path='/' exact render={(props) =>{
                return <LogIn onLogIn={this.onClickLogIn}
                              {...props}/>
              }}/>

              {/* Ovaa component ne se povikuva nikogas vaka, tuku samo od drugi components.
                  Za da go proveris ova so history treba da odis na /header */}
              {/* Ova e frkata 
                  1. dava history
                  2. ne dava history*/}
              <Route path='/header' exact render={(props) =>{
                return <Header {...props} loggedInEmployee={this.state.loggedInEmployee}/>
              }}/>
              {/* <Route path='/header' exact component={Header}/> */}



              <Route path='/register' component={registerNewUser}/>
              <Route path='/confirmOldPassword' exact render={(props) => {
                return <ConfirmOldPassword loggedInEmployee={this.state.loggedInEmployee}
                                           onChangeEmployeeCredentials={this.changeEmployeeCredentials} 
                                           {...props}/>
              }}/>
              <Route path='/home' exact render={(props) =>{
                return <Home onEmployeeLogIn={this.setLoggedInEmployeeInfoToState}
                             loggedInEmployee={this.state.loggedInEmployee}
                             {...props}/>
              }}/>
              {/* CASES */}
              <Route path='/cases' exact render={(props) =>{
                return <AllCases loggedInEmployee={this.state.loggedInEmployee}
                                 cases={this.state.cases}
                                 onDeleteCase={this.deleteCase}
                                 onSearch={this.searchCases}
                                 onClickReset={this.loadAllCasesFromDB} 
                                 {...props}/>
              }}/>
              <Route path='/cases/add' exact render={(props) =>{
                return <AddNewCase employees={this.state.employees}
                                   lawsuitEntities={this.state.lawsuitEntities}
                                   onAddNewCase={this.addNewCaseToDB}
                                   cases={this.state.cases}
                                   loggedInEmployee={this.state.loggedInEmployee}
                                   {...props}/>
              }}/>
              <Route path={"/cases/edit/:caseId"} exact render={(props)=>{
                return <EditCase theCase={props.location.theCase}
                                 lawsuitEntities={this.state.lawsuitEntities}
                                 loggedInEmployee={this.state.loggedInEmployee}
                                 onEditCase={this.editCase}/>
              }}></Route>
              {/* EMPLOYEES */}
              <Route path='/allEmployees' exact render={(props) =>{
                return <AllEmployees loggedInEmployee={this.state.loggedInEmployee}
                                     employees={this.state.employees}
                                     onSearch={this.searchEmployees}
                                     onClickReset={this.loadAllEmployeesFromDB} 
                                     {...props}/>
              }}/>
              <Route path={'/editEmployee'} exact render={(props) =>{
                return <EditEmployee loggedInEmployee={this.state.loggedInEmployee}
                                      onEditBasicInfo={this.editBasicEmployeeInfo}
                                      {...props}/>
              }}/>            
              <Route path='/employees/:caseId' exact render={(props) =>{
                return <EmployeesOfCase theCaseId={props.match.params.caseId}
                                        onRemoveEmployee={this.removeEmployeesFromCase}
                                        loggedInEmployee={this.state.loggedInEmployee}
                                        {...props}/>
              }}/>
              <Route path={"/employees/add/:caseId"} exact render={(props)=>{
                return <AddEmployee theCaseId={props.match.params.caseId}
                                    employees={this.state.employees}
                                    onAddNewEmployeesToCase={this.addEmployeesToCase}
                                    loggedInEmployee={this.state.loggedInEmployee}
                                    {...props}/>
              }}>
              </Route>
              {/* DOCUMENTS */}
              <Route path={'/documents/:caseId'} exact render={(props) =>{
                return <Documents theCaseId={props.match.params.caseId}
                                  onDelete={this.deleteDocument}
                                  loggedInEmployee={this.state.loggedInEmployee}
                                  {...props}/>
              }}/>
              <Route path={"/documents/add/:caseId"} exact render={(props)=>{
                return <AddDocument theCaseId={props.match.params.caseId}
                                    allCases={this.state.cases}
                                    courts={this.state.courts}
                                    loggedInEmployee={this.state.loggedInEmployee}
                                    onUploadDoc={this.uploadDocument}/>
              }}/>
              <Route path={"/documents/edit/:caseId"} exact render={(props)=>{
                return <EditDocument onEditDocument={this.editDocument}
                                     theDocumentInfo={props.location.theDocumentInfo}
                                     theCaseId={props.location.theCaseId}
                                     courts={this.state.courts}
                                     loggedInEmployee={this.state.loggedInEmployee}/>
              }}/>
              <Route path={"/documents/transfer/:docId"} exact render={(props)=>{
                return <TransferDocument theDocumentInfo={props.location.theDocumentInfo}
                                          thisCaseId={props.location.thisCaseId}
                                          cases={this.state.cases}
                                          onMoveDoc={this.moveDocsBetweenCases}
                                          loggedInEmployee={this.state.loggedInEmployee}
                                          {...props}/>
              }}/>
              {/* LAWSUIT-ENTITIES */}
              <Route path={"/allLawsuitEntities"} exact render={(props) =>{
                return <AllLawsuitEntities lawsuitEntities={this.state.lawsuitEntities}
                                            onDeleteLawsuitEntity={this.deleteLawsuitEntity}
                                            onSearch={this.searchLawsuitEntities}
                                            onClickReset={this.loadAllLawsuitEntitiesFromDB}
                                            loggedInEmployee={this.state.loggedInEmployee}
                                            {...props}/>
              }}/>          
              <Route path={"/lawsuitEntities/add"} exact render={(props)=>{
                return <AddLawsuitEntity onAddLawsuitEntity={this.addNewLawsuitEntityToDB}
                                         redirectPath={props.location.redirectPath}
                                         loggedInEmployee={this.state.loggedInEmployee}
                                         {...props}/>
              }}/>           
              <Route path={"/lawsuitEntities/edit/:lawsuitEntityId"} exact render={(props)=>{
                return <EditLawsuitEntity onEditLawsuitEntity={this.editLawsuitEntity}
                                          theLawsuitEntity={props.location.theLawsuitEntity}
                                          loggedInEmployee={this.state.loggedInEmployee}
                                          {...props}/>
              }}/>

              <Route component={error}/>
            </Switch> 
          </Router>

        
      </div>
    );
  }
}

export default App;
