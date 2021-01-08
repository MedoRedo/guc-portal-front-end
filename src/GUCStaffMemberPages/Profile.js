import React from 'react';
import Logout from './Logout';
import {Redirect, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


function Profile(props) {
  return (
    localStorage.getItem('auth_token') === null ? <Redirect to="/"/> :
    <>
      <h1>{localStorage.getItem('userId')}</h1>
      <Logout/>
      <Link to="/changePassword" style={{textDecoration:'none'}}>
        <Button
          variant="contained"
          color="secondary"
        >
          Change Password
        </Button>
      </Link>
    </>
  );
}


export default Profile;