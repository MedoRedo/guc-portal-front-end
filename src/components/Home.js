import React from 'react';
import Login from '../GUCStaffMemberPages/Login';
import Profile from '../GUCStaffMemberPages/Profile';
import Requests from "../HODPages/Requests";
import AllCourses from '../CommonCourses/Courses'
import Course from "../HODPages/Course";
import ChangePassword from '../GUCStaffMemberPages/ChangePassword';
import { Route, Switch } from 'react-router-dom';
import NavBar from "./NavBar";
import SignInOut from '../GUCStaffMemberPages/SignInOut';
import Assign from "../HODPages/AssignInstructor";

import LocationOps from "../HRpages/LocationOps";
import facultyOps from "../HRpages/facultyops";
import DeptOps from "../HRpages/Deptops";
import CourseOps from "../HRpages/Courseops";
import MemberOps from "../HRpages/Staffops";
import AddLocation from "../HRpages/Add Location";
import AddFaculty from "../HRpages/Add Faculty";
import AddDept from "../HRpages/Add Department";
import AddCourse from "../HRpages/Add Course";
import AddMember from "../HRpages/AddMember";
import HRbuttons from "../HRpages/Buttons";
function Home() {
  return (
    <>
      <NavBar/>
      <Switch>
       <Route path="/hrhome" component={HRbuttons} exact/>
       <Route path="/addLocation" component={AddLocation} exact/>
       <Route path="/addFaculty" component={AddFaculty} exact/>
       <Route path="/addDept" component={AddDept} exact/>
       <Route path="/addCourse" component={AddCourse} exact/>
       <Route path="/addMember" component={AddMember} exact/>

       <Route path="/locationOps" component={LocationOps} exact/>
       <Route path="/facultyOps" component={facultyOps} exact/>
       <Route path="/deptOps" component={DeptOps} exact/>
       <Route path="/courseOps" component={CourseOps} exact/>
       <Route path="/memberOps" component={MemberOps} exact/>

        <Route path="/login" component={Login} exact/>
        <Route path="/courses" component={AllCourses} exact/>
        <Route path="/courses/:id?" render={props => <Course {...props}/>} exact/>
        <Route path="/courses/:id?/assign" render={props => <Assign {...props}/>} exact/>
        <Route path="/requests" component={Requests} exact/>
        <Route path="/changePassword" component={ChangePassword} exact/>
        <Route path="/signin" component={SignInOut} exact/>
        <Route path="/signout" component={SignInOut} exact/>
        <Route path="" render={props => <Profile {...props}/>} exact/>

      </Switch>
    </>
  );
}

export default Home;
