import React from 'react';
import { Link } from 'react-router-dom';

import api from '../api';

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
        })
    }
    
    render() {
        
        return(
            <div>
                <h1>Course Work Detail for {this.props.match.params.title}</h1>
            </div>
        )
    }
}

export default CourseWorkDetail;