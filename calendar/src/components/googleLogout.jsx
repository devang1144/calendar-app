import React from 'react';
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
    <button onClick={signOut} className="add-event-btn">
      <i className="fa fa-google pr-2"></i>

      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;