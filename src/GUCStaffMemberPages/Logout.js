import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from 'react-router';

function Logout(props) {

  let history = useHistory();
    
  const handleClick = async (e) => {
    try {
      await axios.get('http://localhost:5000/logout',{
        headers : {
          auth_token : localStorage.getItem('auth_token')
        }
      });
      localStorage.removeItem('auth_token'); 
      localStorage.removeItem('userId');
      history.push('/');     
    }
    catch(e) {
      console.log(e);
    }
  }
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      Logout
    </Button>
  );
}

export default Logout;