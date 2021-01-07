import React from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';


function Logout(props) {
    
  const handleClick = async (e) => {
    try {
      await axios.get('http://localhost:5000/logout');
      props.setUserId("");
      
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
      Log out
    </Button>
  );
}

export default Logout;