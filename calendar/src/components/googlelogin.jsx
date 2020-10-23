import React, { Component } from 'react'
import Popover from '@material-ui/core/Popover';
import {GoogleLogin, GoogleLogout } from 'react-google-login';

const responseGoogle = (response) => {
    console.log(response);
  }

export default class Glog extends Component {
    state = {
        logStatus:false
    }
    render() {
        return (
            <div>
                <h1>Google login</h1>
                  <GoogleLogin
                        clientId="846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <GoogleLogout
                        clientId="846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com"
                        buttonText="Logout"
                        >
                    </GoogleLogout>
            </div>
        )
    }
}
