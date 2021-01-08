import React from 'react';
import Login from './GUCStaffMemberPages/Login';
import Profile from './HODPages/HODProfile';
import Requests from "./HODPages/Requests";
import Courses from "./HODPages/Courses";
import ChangePassword from './GUCStaffMemberPages/ChangePassword';
import { Route, Switch } from 'react-router-dom';
import NavBar from "./components/NavBar";
import Home from "./components/Home";
function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
