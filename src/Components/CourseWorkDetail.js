import React from 'react';
import Plot from 'react-plotly.js';

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
        })
    }
    
    render() {
        
        let grades;
        
        if (this.state.submissions.length > 0) {
            grades = data.analyseGrades(this.state.submissions);
            
            console.log(grades);
        }
        
        return(
            <div>
                <h1>Course Work Detail for {this.props.match.params.title}</h1>
            
                {
                    this.state.submissions.length ?
                        <div>
                            <h2>Assignment State Summary</h2>
                            <p>{data.analyseStates(this.state.submissions)}</p>
                            <h2>Grade Stats</h2>
                            {
                                grades.success ?
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <td>Mean</td>
                                                <td>Median</td>
                                                <td>Mode</td>
                                                <td>Variance</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{grades.mean}</td>
                                                <td>{grades.median}</td>
                                                <td>{grades.mode}</td>
                                                <td>{grades.variance}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div>
                                        <Plot data={[
                                            {
                                                type: "histogram",
                                                x: grades.values
                                            }
                                        ]}/>
                                    </div>
                                </div> : <div>{grades.message}</div>
                            }
                        </div> : <div>Please wait for submissions to load.</div>
                }
            </div>
        )
    }
}

export default CourseWorkDetail;