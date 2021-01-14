import * as React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => axios.post("http://localhost:5000/addLocation",{
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
      <h2>Add Department </h2>
    <form style={myStyle} onSubmit={handleSubmit(onSubmit)}>
    <label style={labelStyle} for="name">Department's name</label> 
      <input name="name" ref={register} placeholder="Electronics" />
      <label style={labelStyle} for="HOD">Head of Dept</label>
      <input name="HOD" ref={register} placeholder="John Appleseed" /> 
      <input type="submit" />
    </form>
    </>
  );
}
