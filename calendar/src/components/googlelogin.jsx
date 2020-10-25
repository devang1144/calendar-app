import React, { useState, useEffect } from 'react';
import GoogleLogin, { useGoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { refreshTokenSetup } from './utils/refreshToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
const clientId = '846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com';


    async function signup (res) {
    const payload = {
      kind: 'Google',
      name: res.profileObj.name,
      email: res.profileObj.email,
      password:res.profileObj.googleId
    };
    const {data:response} = await axios.post('/api/user/register', payload);
    if (response === "Email already exists"){
      const {data:resp} = await axios.post('/api/user/glogin', payload);
      console.log(response, resp)
        const {data:user} = await axios.post('api/user', {_id:jwt_decode(resp)._id})
        console.log(user.accounts[0].uid)
        Cookies.set('lauth',user._id);
        Cookies.set('uname',user.accounts[0].uid);
        Cookies.set('IsloggedIn',true);
        Cookies.set('gLoggedIn', true);
    }
    else {
      Cookies.set('lauth', response._id)
      Cookies.set('uname',response.accounts[0].uid)  
    }
    console.log(Cookies.get())
    // return <Redirect to='/d' />
};

function Login() {
    const history  = useHistory();
  const [logStatus, setlogStatus] = useState(false);
  
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    signup(res)
    setlogStatus(true);
    refreshTokenSetup(res);
  };
  
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });
  const length = Cookies.get('lauth') === undefined ? 0 : Cookies.get('lauth').length;
  if (length != 0) {
    history.push("/d");
  }
  return (
    <button onClick={signIn} className="sign-up  ml-2 border-0 m-2">
      <span className="buttonText ">Sign in with <i class="ml-1 fa fa-google" aria-hidden="true"></i></span>
    </button>
  );
}

export default Login;