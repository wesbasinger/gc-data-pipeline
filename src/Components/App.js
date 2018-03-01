import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import api from '../api';

const CLIENT_ID = "1093742908149-94g80lmd7ur6j1netgio5jg79a36p82q.apps.googleusercontent.com";
const API_KEY = "AIzaSyBT7TPNHF_xfRNQQoNWI0fDE_-1P21rP7Y";

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly";

class App extends React.Component {
    
    componentDidMount() {
        require('google-client-api')().then((gapi) => {
            console.log('initializing GAPI...');
            
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(() => {
                api.getCourses((results) => {
                    const activeCourses = results.filter((course) => {
                        return(course.courseState === 'ACTIVE')
                    })
                    
                    console.log(activeCourses)
                })
            })
        })
    }
    
    render() {
        return(
            <Router>
                <div>
                    <p>Classroom API Quickstart</p>
                    <button onClick={(e) => {
                        window.gapi.auth2.getAuthInstance().signIn();
                    }}>Sign In</button>
                    <button onClick={(e) => {
                        window.gapi.auth2.getAuthInstance().signOut();
                    }}>Sign Out</button>
                    <pre></pre>
                </div>
            </Router>
        )
    }
}

export default App;