import React from 'react';
import Logout from './Logout';
import {Redirect} from 'react-router-dom';

class Profile extends React.Component {
    render() {
        return (
            this.props.userId === "" ? <Redirect to="/"/> :
            <>
                <h1>{this.props.userId}</h1>
                <Logout setUserId={this.props.setUserId} userId={this.props.userId}/>
            </>
        );
    }
}

export default Profile;