import React from 'react';
import { Route } from 'react-router-dom';
import Home from "./components/Home";
import Profile from "./HODPages/AssignInstructor";
import CourseCard from "./components/CourseCard";


function App() {
  return (
    <Route path="/" component={Home}/>
  );
}

export default App;
