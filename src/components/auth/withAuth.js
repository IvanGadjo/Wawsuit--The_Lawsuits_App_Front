// ova e HIGHER ORDER COMPONENT - HOC
// HOC e najcesto funkcija sto zema eden component
// i vrakja nekoj drug enhanced component

import React from "react";
import AuthService from "./AuthService";


    /*
    Ovoj component e filter component - ja filtrira sekoja component koja ja wrap-nuva spored toa
    dali userot e logiran ili ne. Ako e logiran togas se prikazuva soodvetnata component so withAuth funkcijata
    kako nejzin wrapper component. Ako ne e samo redirect-nuva kon / odnosno <LogIn> component.
    Ima podole podobro objasnuvanje
     */


export default function withAuth(AuthComponent) {

    const Auth = new AuthService();

    return class AuthWrapped extends React.Component{

        constructor() {
            super();
            this.state = {
                user:null
            }
        }

        componentWillMount() {
            //debugger;
            if(!Auth.loggedIn()){               // ako userot ne e logiran redirect na login
                this.props.history.replace('/')
            }
            else{           // ako e logiran probuvame da go zememe negoviot profil
                try {
                    const profile = Auth.getProfile();  // dekodirame token i go stavame vo state
                    this.setState({
                        user:profile
                    })
                }
                catch (err) {
                    Auth.logout();
                    this.props.history.replace('/')
                }
            }
        }


        render() {
            if(this.state.user){    // ako userot vo state ne e null (ako e logiran)
                return(
                    // <div>   {console.log(this.props)}
                    //     <AuthComponent {...this.props} {...this.state}/>
                    // </div>
                     <AuthComponent {...this.props} {...this.state}/>        
                )                                                       
                                            
                /*  Ovaa funkcija (withAuth) se izvrsuva pri sekoe renderiranje na component koja e wrapnata
                    so withAuth. <AuthComponent> se predava kako argument na funkcijata - toa e wrapnatata comp.
                    so return <AuthComponent {...this.props} {...this.state}/> se renderira vekje proverenata
                    component (za dali userot e logiran).
                    This.props tuka se propsot od samata component koja e wrapnata, pa zatoa so {...this.props}
                    povtorno i se "vrakjaat" nejzinite props. Isto taka i se predava use eden nov prop preku 
                    {...this.state} - a toa e this.state odnosno state na ovaa funkcija (linija 24). Vo toj state
                    se cuva user. Znaci <AuthComponent> na kraj za props ke gi ima site svoi props + user.
                 */
            }
            else{
                return null;
            }
        }
    }
}