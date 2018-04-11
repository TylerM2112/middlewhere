import React, { Component } from 'react';

export default class Auth0Form extends Component {
    render() {
        return (
            <form id="signup">
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
            </form>
        );
    }
}