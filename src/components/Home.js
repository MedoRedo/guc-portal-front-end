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
import UpadteProfile from '../GUCStaffMemberPages/UpdateProfile';
import MissingDaysHours from '../GUCStaffMemberPages/MissingDaysHours';

function Home() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/login" component={Login} exact/>
        <Route path="/courses" component={AllCourses} exact/>
        <Route path="/courses/:id?" render={props => <Course {...props}/>} exact/>
        <Route path="/courses/:id?/assign" render={props => <Assign {...props}/>} exact/>
        <Route path="/requests" component={Requests} exact/>
        <Route path="/changePassword" component={ChangePassword} exact/>
        <Route path="/signin" component={SignInOut} exact/>
        <Route path="/signout" component={SignInOut} exact/>
        <Route path="/updateProfile" component={UpadteProfile} exact/>
        <Route path="/missingDays" component={MissingDaysHours}/>
        <Route path="" render={props => <Profile {...props}/>} exact/>

      </Switch>
    </>
  );
}

export default Home;
