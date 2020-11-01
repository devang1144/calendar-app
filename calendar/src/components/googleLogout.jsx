import React from 'react';
import Button from '@material-ui/core/Button';
import { useGoogleLogout } from 'react-google-login';
import Cookies from 'js-cookie';
const clientId = '846399072508-1aj3ttvbsjduqn7kl1pjjbvge2cdmtkb.apps.googleusercontent.com';

function Logout() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    Cookies.remove('lauth');
    Cookies.remove('uname');
    Cookies.set('gLoggedIn', false);
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
  });

  return (
    <span className="m-4" onClick={signOut}>
      <i className="fa fa-google pr-2 mt-2 mb-2"></i>
      <span className="buttonText">Sign out</span>
    </span>
  );
}

export default Logout;