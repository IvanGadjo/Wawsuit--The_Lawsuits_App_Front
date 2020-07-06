import React, { Component } from "react";
import {Link} from "react-router-dom";
import AuthService from "./AuthService";


// onLogIn

class logIn extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);   // mora da mu napravis bind za da mozes da koristis this vo metodot
        this.handleFormSubmit = this.handleFormSubmit.bind(this);

        this.state = {
            showWrongCredentialsMessage: false
        }
    }

    componentWillMount() {
        //debugger;
        if (this.Auth.loggedIn()){
            
            console.log(this.props.history);
            this.props.history.replace('/home');        // ako userot e vekje logiran togas odi na home component
        }
    }

    handleChange(e){                // stava vo state username i password
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    handleFormSubmit(e){
        e.preventDefault();

        //debugger;
        //console.log(this.state.username,this.state.password)

        this.Auth.login(this.state.username, this.state.password)   // ako userot e logiran go nosi na App component
            .then(res => {
                this.props.onLogIn().then(resp => {
                    this.props.history.replace('/home');    
                })

                // this.props.onLogIn();
                // this.props.history.replace('/home');
            })
            .catch(err =>{
                this.setState((prevState) =>{
                    return {
                        showWrongCredentialsMessage: true
                    }
                })
            })
    }

    renderWrongCredentialsMsg = () =>{
        if(this.state.showWrongCredentialsMessage === true){
            return(
                <p className={'validationErrorText'}>Wrong username or password!</p>
            )
        }
        else{
            return <div/>
        }
    }



    render() {

        return(
            <div className={"container-fluid"}> 
            {/* {console.log(this.props)} */}
                <form onSubmit={this.handleFormSubmit}>
                    <h4>Login</h4>
                    <label htmlFor={'username'} className={"smallText"}>Username:</label>
                    <div>
                        <input type='text' name={'username'} onChange={this.handleChange}/>
                    </div>
                    <label htmlFor={'password'} className={"smallText"}>Password:</label>
                    <div>
                        <input type='password' name={'password'} onChange={this.handleChange}/>
                    </div>

                    {this.renderWrongCredentialsMsg()}

                    <div>
                        <input type='submit' className={'form-submit btn'} value={'submit'}
                               id={"button"}/>
                    </div>

                    

                </form>

                <br/><br/>
                <Link to={'/register'}>
                    <button className={"btn"} id={"button"}>Register new user</button>
                </Link>
            </div>
        )
    }

}


export default logIn;