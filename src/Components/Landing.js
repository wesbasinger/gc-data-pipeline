import React from 'react';

const Landing = (props) => {
    if (props.loggedIn) {
        return(
            <div>You are logged in.</div>
        )
    } else {
        return(
            <button onClick={props.onLogin}>Log In</button>
        )
    }
}

export default Landing;