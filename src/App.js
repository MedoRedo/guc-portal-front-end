import React from 'react';
import { Route } from 'react-router-dom';
import Home from "./components/Home";
import Profile from "./HODPages/AssignInstructor";
import CourseCard from "./components/CourseCard";
import AddLocation from "./HRpages/Add Location";
import LocationOps from "./HRpages/LocationOps";

function App() {
  return (
    <Route path="/" component={LocationOps} />
  );
}

export default App;
