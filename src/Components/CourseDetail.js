import React from 'react';

class CourseDetail extends React.Component {
    
    
    render() {
        
        return(
            <div>
                <h1>Course Detail for {this.props.match.params.courseName}</h1>
            </div>
        )
    }
}

export default CourseDetail;