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
      <h2>Add Course </h2>
    <form style={myStyle} onSubmit={handleSubmit(onSubmit)}>
        
      <label style={labelStyle} for="name">Course's name</label> 
      <input name="name" ref={register} placeholder="ex: c7.201" />

      <label style={labelStyle} for="courseCoord">Course Coordinator</label>
      <input name="courseCoord" ref={register} placeholder="CSEN, DEMT" /> 

      <label style={labelStyle} for="TAs">TAs</label>
      <input name="TAs" ref={register} placeholder="Nora, Bassem" /> 

      <label style={labelStyle} for="instructors">Instructors</label>
      <input name="instructors" ref={register} placeholder="Big Ramy" /> 

      <label style={labelStyle} for="numSlots">Number of Slots</label>
      <input name="numSlots" ref={register} placeholder="7" /> 

      <label style={labelStyle} for="mainDepartment">Main Department</label>
      <input name="mainDepartment" ref={register} placeholder="CSEN" /> 

      <label style={labelStyle} for="teachingDepartments">Teaching Departments</label>
      <input name="teachingDepartments" ref={register} placeholder="CSEN,ELECT,COMM" /> 
      

      <input type="submit" />
    </form>
    </>
  );
}
