import React, { Component } from 'react';
// import Auth0Lock from 'auth0-lock';

export default class Auth0Form extends Component {
  constructor(props){
    super(props)

    this.state = {

    }
  }
  
  
  
    render() {
      const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`);
      window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/login?client=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}`

      
        return (
          
          <div>
            
           </div>


        );
        
  
    }
}
