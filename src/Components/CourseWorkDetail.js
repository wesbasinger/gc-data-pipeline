import React from 'react';
import Plot from 'react-plotly.js';
import { ChasingDots } from 'better-react-spinkit';

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
            <div className="container">
                <div className="starter-template">
                    <h1>Course Work Detail for {this.props.match.params.title}</h1>
                
                    {
                        this.state.submissions.length ?
                            <div>
                                <h2>Assignment State Summary</h2>
                                <p className="lead">{data.analyseStates(this.state.submissions)}</p>
                                <h2>Grade Stats</h2>
                                {
                                    grades.success ?
                                    <div>
                                        <table className="table">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <td>Mean</td>
                                                    <td>Median</td>
                                                    <td>Mode</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{Math.round(grades.mean)}</td>
                                                    <td>{Math.round(grades.median)}</td>
                                                    <td>{Math.round(grades.mode)}</td>
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
                            </div> : <div>Please wait for submissions to load.<ChasingDots /></div>
                    }
                </div>
            </div>
        )
    }
}

export default CourseWorkDetail;