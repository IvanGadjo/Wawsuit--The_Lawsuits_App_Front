import React from 'react'
import { Link } from 'react-router-dom';
import AuthService from './auth/AuthService';
import withAuth from './auth/withAuth'

const Auth = new AuthService();

// TODO: Ovoj component ne prima props od app, tuku od komponentata od kade sto se renderira
// ova znaci deka eden prop mora da go primi od site komponenti kade sto se koristi <Header/>

// loggedInEmployee, onLogOut

const header = (props) => {

    const handleLogout = () => {
        Auth.logout();
        props.onLogOut();
    }

    return(
        <div className='row'>   
            {/* App navbar */}
            <div className={"col-10 btn-group"} id={"navbarButtons"}>

                <button className={"nav-item"}><Link to={"/home"}>Home</Link></button>&nbsp;
                <button className={"nav-item"}><Link to={"/cases"}>Cases</Link></button>&nbsp;
                <button className={"nav-item"}><Link to={"/allEmployees"} >All Employees</Link></button>&nbsp;
                <button className={"nav-item"}><Link to={"/allLawsuitEntities"} >All lawsuit entities</Link></button>&nbsp;

            </div>

            <div className={"col-2"}>
                <span className={"badge badge-secondary"}>{props.loggedInEmployee.role}</span><br/>

                <button type="button" className="btn form-submit" id={"logoutButton"}
                        onClick={handleLogout.bind(this)}>Logout</button>
                <br/><br/>
            </div>
        </div>
    )
};

export default withAuth(header);