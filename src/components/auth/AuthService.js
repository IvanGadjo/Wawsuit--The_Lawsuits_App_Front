import decode from 'jwt-decode'

export default class AuthService {
    constructor(domain) {
        this.domain = domain || `http://localhost:8080`;
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }


    // zema token od API serverot (bi trebalo da ti e na backend) so pomos
    // na fetch API
    login(username, password){
        return this.fetch(`${this.domain}/login`,{
            method:'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res =>{
            this.setToken(res.token);   // go stava tokenot vo localStorage, a tokenot go zema ustvari od response-ot
                                        // od serverot (vekje decode-nat JWT token vo fetch() funkcijata podole).
            return Promise.resolve(res);
        })
    }



    fetch(url, options){        // funkcijava go zema JWT tokenot, i go vrakja decodiran

        const headers = {
            'Accept':'application/json',
            'Content-type':'application/json'
        };

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if(this.loggedIn()){
            headers['Authorization'] = `Bearer ${this.getToken()}`      // standard za JWT mora da se stavi vo header Bearer: ...
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(resp => resp.json())
    }



    // zemi token od localStorage
    getToken(){
        return localStorage.getItem('id_token');
    }
    // save token vo localStorage
    setToken(idToken){
        return localStorage.setItem('id_token',idToken)
    }


    loggedIn(){
        const token = this.getToken();      // zema token od localStorage
        return !!token && !this.isTokenExpired(token)   // vrakja ako ima token i ako toj token ne e expired
    }


    // tuka pravime decode na tokenot
    isTokenExpired(token){
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now()/1000){          // podeleno so 100 bidejki e vo milisekundi
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }

    // go trga tokenot i userData (pass i username) od localstorage
    logout(){
        localStorage.removeItem('id_token')
    }



    getProfile(){               // ovoj metod ke se koristi vo withAuth component za filtriranje
        return decode(this.getToken())      // decode ako ne uspee frla error
    }

    _checkStatus(response){
        if(response.status >= 200 && response.status < 300){
            return response;
        }
        else{
            let error = new Error(response.status);
            error.response = response;
            throw error;
        }
    }

}