import React from 'react';

import api from '../api';
import data from '../data';

class CourseWorkDetail extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            submissions: []
        }
    }
    
    componentDidMount() {
        api.getAllSubmissions(this.props.match.params.courseId, this.props.match.params.courseWorkId).then((results) => {
            this.setState({submissions: results})
            
            console.log(data.getStatus(results));
        })
    }
    
    render() {
        
        return(
            <div>
                <h1>Course Work Detail for {this.props.match.params.title}</h1>
            
                {
                    this.state.submissions.length ?
                        <div>
                            {data.analyseStates(this.state.submissions)}
                        </div> : <div>Please wait for submissions to load.</div>
                }
            </div>
        )
    }
}

export default CourseWorkDetail;