import React from 'react';

const Header = (props) => {
    
    return(
        <div>
            Google Classroom Data Pipeline
            {
                props.loggedIn ?
                    <div>
                        Name: {props.name}
                        <img alt="profile pic" src={props.imageUrl} />
                        <button onClick={()=>{
                            props.onLogout();
                        }}>Log Out</button>
                    </div> :
                    <div>
                        Please log in.
                    </div>
            }
        </div>
    )
}

export default Header;