import React from 'react';
import { Link } from 'react-router-dom';
import { ChasingDots } from 'better-react-spinkit';

const CourseTile = (props) => {
    
    const composedUrl = `/course/${props.id}/${props.name}`;
    
    return(
        <div>
            <Link to={composedUrl}><h2>{props.name}</h2></Link>
            <p>{props.desc}</p>
        </div>
    )
}

const Landing = (props) => {
    if (props.loggedIn && props.courses.length) {
        return(
            <div className="container">
                <div className="starter-template">
                    <h1>Active Courses</h1>
                    {
                        props.courses.map((course) => {
                            return(
                                <CourseTile key={course.id} id={course.id} name={course.name} desc={course.descriptionHeading}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else if (props.loggedIn && !props.courses.length) {
        return(
            <div className="container">
                <div className="starter-template">
                    <p>Courses are loading...</p>
                    <ChasingDots size={150}/>
                </div>
            </div>
        )
    } else {
        return(
            <div className="container">
                <div className="starter-template">
                    <h1>Welcome to the Google Classroom Data Dashboard.</h1>
                    <button 
                        type="button" className="btn btn-primary"
                        onClick={props.onLogin}>Log In</button>
                </div>
            </div>
        )
    }
}

export default Landing;