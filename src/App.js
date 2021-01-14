import React from 'react';
import { Route } from 'react-router-dom';
import Home from "./components/Home";
import Profile from "./HODPages/AssignInstructor";
import CourseCard from "./components/CourseCard";
import AddLocation from "./HRpages/Add Location";
import LocationOps from "./HRpages/LocationOps";
import AddFaculty from "./HRpages/Add Faculty";
import AddDept from "./HRpages/Add Department"
import AddCourse from "./HRpages/Add Course";
import AddMember from "./HRpages/AddMember";
function App() {
  return (
    <Route path="/" component={AddMember} />
  );
}

export default App;
