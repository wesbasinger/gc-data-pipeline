import React from 'react';

const Landing = (props) => {
    if (props.loggedIn) {
        return(
            <div>You are logged in.</div>
        )
    } else {
        return(
            <div>Please log in.</div>
        )
    }
}

export default Landing;