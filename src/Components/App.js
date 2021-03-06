import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import CourseDetail from './CourseDetail';
import CourseWorkDetail from './CourseWorkDetail';


import api from '../api';

const CLIENT_ID = "1093742908149-94g80lmd7ur6j1netgio5jg79a36p82q.apps.googleusercontent.com";
const API_KEY = "AIzaSyBT7TPNHF_xfRNQQoNWI0fDE_-1P21rP7Y";

const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/classroom/v1/rest"];
const SCOPES = "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.coursework.students.readonly";




class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            loggedIn: false,
            name: "",
            imageUrl: "",
            courses: []
        }
        
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    
    componentDidMount() {
        
        var self = this;
        
        require('google-client-api')().then((gapi) => {
            console.log('initializing GAPI...');
            
            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            }).then(() => {
                if(gapi.auth2.getAuthInstance().isSignedIn.get()) {
                    self.setState({loggedIn: true})
                    
                    const name = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
                    const imageUrl = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
                    
                    self.setState({name, imageUrl})
                    
                    api.getAllCourses().then((res) => {self.setState({courses: res})})
                }
            })
            
        })
    }
    
    handleLogout() {
        
        this.setState({
            loggedIn:false,
            name: "",
            imageUrl: ""
        })
        
        require('google-client-api')().then((gapi) => {
            gapi.auth2.getAuthInstance().signOut()
        })
        
    }
    
    handleLogin() {
        
        const self = this;

        require('google-client-api')().then((gapi) => {
            gapi.auth2.getAuthInstance().signIn().then(() => {
                const name = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName();
                const imageUrl = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl();
                
                self.setState({
                    name: name,
                    imageUrl: imageUrl,
                    loggedIn: true
                })                
            })
            

        })
        
    }
    
    render() {
        return(
            <Router basename="/gc-data-pipeline">
                <div>
                    <Header loggedIn={this.state.loggedIn} 
                            name={this.state.name} 
                            imageUrl={this.state.imageUrl}
                            onLogout={this.handleLogout}/>
                    <Switch>
                        <Route exact path="/" render={()=><Landing loggedIn={this.state.loggedIn} onLogin={this.handleLogin} courses={this.state.courses}/>}/>
                        <Route path="/course/:courseId/:courseName" component={CourseDetail} />}/>
                        <Route path="/courseWork/:courseWorkId/course/:courseId/title/:title" component={CourseWorkDetail} />}/>
                    </Switch>
                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App;