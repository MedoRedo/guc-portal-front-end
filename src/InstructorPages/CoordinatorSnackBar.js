import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import axios from 'axios';
import { useParams } from "react-router-dom";

function CoordSnackbar(props) {
    const [state, setState] = React.useState({
        open: false,
        vertical: "top",
        horizontal: "center"
    });
    const params = useParams();
    const [text,setText] = useState("");
    const [severity,setSeverity] = useState("success");
    const { vertical, horizontal, open } = state;



    const handleClose = () => {
    setState({ ...state, open: false });
    };
    const handleClick = () => {
    const courseId =params.courseId;
    console.log(props.memberId);
    fetch(`https://gucportalguc.herokuapp.com/instructors/courses/${courseId}/coordinator/${props.memberId}`,{
        method:'PATCH',
        headers:{
            'Content-Type':'application/json',
            auth_token:localStorage.getItem('auth_token')
        }
    }).then((res)=>{
            setSeverity('success');
            setText('Co-ordinator assigned successfully!');
            setState({ ...state, open: true });
    }).catch((err)=>{
        setSeverity('error');
        setText('An error Occured,The assignment wasn\'t successful!');
        console.log(err);
        setState({ ...state, open: true });

    })
  
    };
    return (
    <div className={props.className}>
        <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        message="I love snacks"
        key={vertical + horizontal}
        >
        <Alert onClose={handleClose} severity={severity} variant='filled'>
            {text}
        </Alert>
        </Snackbar>
        <Button variant='contained' color='secondary' onClick={()=>{handleClick()}}>Save</Button>
    </div>
    );
}
export default CoordSnackbar;