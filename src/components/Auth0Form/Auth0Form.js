import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import objectHelper from './helpers/object';
import UsernamePassword from './helpers/UsernamePassword'
import "dotenv";

export default class Auth0Form extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }
  
  
  
    render() {

      var webAuth = new auth0.WebAuth({
        domain:    process.env.REACT_APP_AUTH0_DOMAIN,
        clientID:  process.env.REACT_APP_AUTH0_CLIENT_ID,
           
      });

      webAuth.login({
        realm: 'tests',
        username: 'testuser',
        password: 'testpass',
      });
      
        return (
           <div id="auth_lock_container">
          {UsernamePassword}
           </div>


        );
        
  
    }
}





  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      
      // const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;
      // const secret = process.env.REACT_APP_AUTH0_CLIENT_SECRET;
      // const domain = process.env.REACT_APP_AUTH0_DOMAIN
      // console.log('process.env.REACT_APP_AUTH0_CLIENT_ID', process.env.REACT_APP_AUTH0_CLIENT_ID)
      // let lock = new Auth0Lock(process.env.REACT_APP_AUTH0_CLIENT_ID, process.env.REACT_APP_AUTH0_DOMAIN, options)
      // const options = {
      //   container: "auth_lock_container"
      // }
      // lock.show()


{/* <form id="signup">
<legend>Sign up</legend>
   <p>
     <input type="email" id="signup-email" placeholder="Email" required/>
   </p>
   <p>
     <input type="password" id="signup-password" placeholder="Password"
            required/>
   </p>
   <p>
     <input type="text" id="name" placeholder="Full name" required/>
   </p>
    <p>
     <input type="text" id="color" placeholder="Favorite color"/>
   </p>
   <input type="submit" value="Sign up"/>
</form> */}