import React from 'react';
import { Link } from 'react-router-dom';

import api from '../api';

class CourseDetail extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            courseWork : []
        }
    }
    
    componentDidMount() {
        api.getAllCourseWork(this.props.match.params.courseId).then((result) => {
            this.setState({courseWork: result})
        })
    }
    
    
    render() {
        
        return(
            <div>
                <h1>Course Detail for {this.props.match.params.courseName}</h1>
                
                {
                    this.state.courseWork.length ?
                    
                    <div>
                        {
                            
                            this.state.courseWork.map((cw) => {
                            
                                const composedUrl = `/course/${this.props.match.params.courseId}/courseWork/${cw.id}`
                            
                                return(<Link to={composedUrl}><p>{cw.title}</p></Link>)
                            })
                        }
                    </div> : <div>Loading assignments....</div>
                }
            </div>
        )
    }
}

export default CourseDetail;