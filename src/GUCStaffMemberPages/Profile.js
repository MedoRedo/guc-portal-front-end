import React from 'react';

class Profile extends React.Component {

    render() {
        return (
            <h1>{this.props.userId}</h1>
        );
    }
}

export default Profile;