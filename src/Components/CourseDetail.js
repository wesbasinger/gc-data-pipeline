import React from 'react';
import { Link } from 'react-router-dom';
import { ChasingDots } from 'better-react-spinkit';

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
            <div className="container">
                <div className="starter-template">
                    <h1>Course Detail for {this.props.match.params.courseName}</h1>
                    
                    {
                        this.state.courseWork.length ?
                        
                        <div>
                            {
                                
                                this.state.courseWork.map((cw) => {
                                
                                    const composedUrl = `/courseWork/${cw.id}/course/${this.props.match.params.courseId}/title/${cw.title}`;
                                
                                    return(<Link key={cw.id} to={composedUrl}><p>{cw.title}</p></Link>)
                                })
                            }
                        </div> : <div className="container">Loading assignments....<ChasingDots/></div>
                    }
                </div>
            </div>
        )
    }
}

export default CourseDetail;