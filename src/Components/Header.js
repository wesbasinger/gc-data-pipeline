import React from 'react';

const Header = (props) => {
   
    return(
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <a className="navbar-brand" href="/">Google Classroom Data Pipeline</a>
                </div>
                {
                    props.loggedIn ?
                        <div id="navbar" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li>Name: {props.name}</li>
                                <li><img height="40px" alt="profile pic" src={props.imageUrl} /></li>
                                <li>
                                    <button
                                        type="button" className="btn btn-primary"
                                        onClick={()=>{
                                        props.onLogout();
                                    }}>Log Out</button>
                                </li>
                            </ul>
                        </div> :
                        <div id="navbar" className="collapse navbar-collapse">
                            Please log in.
                        </div>
                }
            </div>
        </nav>
    )
}

export default Header;

    // <nav >
    //   <div class="container">
    //     <div >
    //       <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
    //         <span class="sr-only">Toggle navigation</span>
    //         <span class="icon-bar"></span>
    //         <span class="icon-bar"></span>
    //         <span class="icon-bar"></span>
    //       </button>
    //       
    //     </div>
    //     <div >
    //       <ul >
    //         <li class="active"><a href="#">Home</a></li>
    //         <li><a href="#about">About</a></li>
    //         <li><a href="#contact">Contact</a></li>
    //       </ul>
    //     </div><!--/.nav-collapse -->
    //   </div>
    // </nav>