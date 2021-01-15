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
      <h2>Add Staff Member </h2>
    <form style={myStyle} onSubmit={handleSubmit(onSubmit)}>

    <label style={labelStyle} for="email">Email</label> 
    <input name="email" ref={register} placeholder="john@xyz.xom" />

    <label style={labelStyle} for="name">Name</label>
    <input name="name" ref={register} placeholder="John Appleseed" /> 

    <label style={labelStyle} for="gender">Gender</label> 
      <select name="gender" ref={register}>
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="females">Female</option>
        <option value="Other">Other</option>
      </select>
    
    <label style={labelStyle} for="salary">Monthly Salary</label>
    <input name="salary" ref={register} placeholder="3000" /> 

    <label style={labelStyle} for="dayOff">Day Off</label>
    <input name="dayOff" ref={register} placeholder="Saturday" /> 

    <label style={labelStyle} for="officeLocation">officeLocation</label>
    <input name="officeLocation" ref={register} placeholder="c7.201" /> 

    <label style={labelStyle} for="department">Department</label>
    <input name="department" ref={register} placeholder="MET" /> 
    
      <input type="submit" />
    </form>
    </>
  );
}
