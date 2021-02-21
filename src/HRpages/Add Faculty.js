import * as React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import {Redirect, useHistory} from 'react-router-dom';
export default function App() {
  let history = useHistory();
  const { register, handleSubmit } = useForm();

<<<<<<< HEAD
  const onSubmit = (data) => axios.post("https://gucportalguc.herokuapp.com/addFaculty",{
||||||| merged common ancestors
  const onSubmit = (data) => axios.post("http://localhost:5000/addLocation",{
=======
  const onSubmit = (data) => axios.post("https://gucportalguc.herokuapp.com/addLocation",{
>>>>>>> 4e8321efbec396c65f37efaee30dd86b54121676
    headers : {
      auth_token : localStorage.getItem('auth_token')
    }
  , data:{
    data
  }
}).then(res =>{
      alert("Course Added Successfully")
      alert(JSON.stringify(data));
      console.log(data)
  })

  

  const myStyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial"
  };
  const labelStyle = {
      margin: "10px"

  };

  return (
      <>
      <h2>Add Faculty </h2>
    <form style={myStyle} onSubmit={handleSubmit(onSubmit)}>
    <label style={labelStyle} for="name">Faculty's name</label> 
      <input name="name" ref={register} placeholder="ex: c7.201" />
      <label style={labelStyle} for="Departments">Departments</label>
      <input name="departments" ref={register} placeholder="CSEN, DEMT" /> 
      <input type="submit" />
    </form>
    </>
  );
}
