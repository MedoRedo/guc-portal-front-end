import * as React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => axios.post("https://gucportalguc.herokuapp.com/addLocation",{
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
