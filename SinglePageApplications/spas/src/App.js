import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './components/Firebase' 
import Home from './components/Home'
import Welcome from './components/Welcome'
import Navigation from './components/Navigation'
import Login from './components/Login';
import Register from './components/Register'
import Meetings from './components/Meeting'
import CheckIn from './components/CheckIn'



class App extends Component 
{
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }
  
  componentDidMount()
  {
      firebase.auth().onAuthStateChanged(fbUser =>
        {
          if(fbUser)
          {
            this.setState({
              user: fbUser,
              displayName : fbUser.displayName,
              userID : fbUser.uid
            })
            const meetingRef = firebase.database().ref('meetings/' + fbUser.uid);
            //get an object containing the users collection of meetings
            meetingRef.on("value", snapshot =>
            {
              let meetings = snapshot.val();
              let meetingList = [];

              //Adds all meetings from the user db into an array 
              for(let item in meetings)
              {
                meetingList.push({
                  meetingID : item,
                  meetingName : meetings[item].meetingName
                });
              }

              this.setState({
                meetings : meetingList,
                meetingCount : meetingList.length
              })
            })
          }          
          else
          {
            this.setState({user:null})
          }
        })
      
  };

  // Called from the Register Component
  // the Register function creates the user in firebase
  // and the below function then uses the newly created user
  // and updates their user profile to include the display name
  registerUser = (userName) =>
  {
    
    firebase.auth().onAuthStateChanged(fbUser =>
      {
        fbUser.updateProfile({
          displayName:userName
        })
        .then(()=>
        {
          this.setState({
              user: fbUser,
              displayName :fbUser.displayName,
              userID : fbUser.uid
          });
          navigate('/meetings')
        })
      })
  }

  logOutUser = e =>
  {
    e.preventDefault();
    this.setState({
      displayName : null,
      userID : null,
      user : null
    });

    firebase.auth().signOut().then(() =>
    {
      navigate('/login');
    })
  
  }

  addMeeting = (meetingName) =>
  {
    //used to tell the database where to write to
    const ref = firebase
    .database()
    //specifies where to store the meetingName
    .ref(`meetings/${this.state.user.uid}`);
    //pushes the new item into the db
    ref.push({meetingName : meetingName });
  }
  render(){
    return (
      <>
      <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && 
        <Welcome userName={this.state.displayName} logOutUser={this.logOutUser} />
        }        
      <Router>
        <Home path='/' user={this.state.user} />
        <Login path='/login' />
        <Meetings path='/meetings'  addMeeting={this.addMeeting}
         meetings={this.state.meetings} userID={this.state.userID} />
        <CheckIn path='/checkin/:userID/:meetingID' />
        {/* Passes a local function into a subcomponent */}
        <Register path='/register' registerUser={this.registerUser} /> 
      </Router>
      </>
    );
  }
}

export default App;