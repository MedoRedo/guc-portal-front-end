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
  }, reason =>{
    alert("Course Failed to be Added")
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
      <h2>Add Location </h2>
    <form style={myStyle} onSubmit={handleSubmit(onSubmit)}>
    <label style={labelStyle} for="name">Location's name</label> 
      <input name="name" ref={register} placeholder="ex: c7.201" />
      <label style={labelStyle} for="capacity">Location's Capacity</label> 
      <input name="capacity" ref={register} placeholder="0-200" />
      <label style={labelStyle} for="type">Location's Type</label> 
      <select name="type" ref={register}>
        <option value="">Select...</option>
        <option value="Lecture Hall">Lecture Hall</option>
        <option value="Lab">Lab</option>
        <option value="Tutorial Room">Tutorial Room</option>
        <option value="office">office</option>
      </select>

      <input type="submit" />
    </form>
    </>
  );
}
