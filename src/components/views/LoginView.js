import React, { Component } from 'react';
import Auth0Form from '../Auth0Form/Auth0Form'
// import {connect} from ''
// this page is the first page user sees LoginView
class LoginView extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }


    render(){
        return(
            <div>
                <h1>Login</h1>
                <Auth0Form/>
            </div>
        );
    }
}
export default LoginView;