import React from 'react';
import Login from '../GUCStaffMemberPages/Login';
import Profile from '../GUCStaffMemberPages/Profile';
import Requests from "../HODPages/Requests";
import Courses from "../HODPages/Courses";
import ChangePassword from '../GUCStaffMemberPages/ChangePassword';
import { Route, Switch } from 'react-router-dom';
import NavBar from "./NavBar";

function Home() {
  return (
    <>
      <NavBar/>
      <Switch>
        <Route path="/login" component={Login} exact/>
        <Route path="/courses" component={Courses} exact/>
        <Route path="/requests" component={Requests} exact/>
        <Route path="/changePassword" component={ChangePassword} exact/>
        <Route path="" render={props => <Profile {...props}/>} exact/>

      </Switch>
    </>
  );
}

export default Home;
