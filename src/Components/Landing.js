import React from 'react';

const CourseTile = (props) => {
    return(
        <div>
            <h2>{props.name}</h2>
            <p>{props.desc}</p>
        </div>
    )
}

const Landing = (props) => {
    if (props.loggedIn && props.courses.length) {
        return(
            <div>
                <h1>Active Courses</h1>
                {
                    props.courses.map((course) => {
                        return(
                            <CourseTile key={course.id} name={course.name} desc={course.descriptionHeading}/>
                        )
                    })
                }
            </div>
        )
    } else if (props.loggedIn && !props.courses.length) {
        return(
            <div>Courses are loading...</div>
        )
    } else {
        return(
            <button onClick={props.onLogin}>Log In</button>
        )
    }
}

export default Landing;