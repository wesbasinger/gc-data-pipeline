import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const CLIENT_ID = "1093742908149-94g80lmd7ur6j1netgio5jg79a36p82q.apps.googleusercontent.com";
const API_KEY = "AIzaSyBT7TPNHF_xfRNQQoNWI0fDE_-1P21rP7Y";

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly";

class App extends Component {
    
    componentDidMount() {
        require('google-client-api')().then((gapi) => {
            console.log('initializing GAPI...');
            
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(() => {
                console.log(gapi.auth2.getAuthInstance().isSignedIn.get())
            })
        })
    }
    
    render() {
        return(
            <div>
                <p>Classroom API Quickstart</p>
                <button>Sign In</button>
                <button>Sign Out</button>
                <pre></pre>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
