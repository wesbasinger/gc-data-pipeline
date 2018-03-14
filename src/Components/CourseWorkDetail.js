import React from 'react';
import { Link } from 'react-router-dom';

import api from '../api';

class CourseWorkDetail extends React.Component {
    
    render() {
        
        return(
            <div>
                <h1>Course Work Detail for {this.props.match.params.courseWorkId}</h1>
            </div>
        )
    }
}

export default CourseWorkDetail;