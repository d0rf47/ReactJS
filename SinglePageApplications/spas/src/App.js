import React, { Component } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from './components/Firebase' 
import Home from './components/Home'
import Welcome from './components/Welcome'
import Navigation from './components/Navigation'
import Login from './components/Login';
import Register from './components/Register'
import Meetings from './components/Meeting'



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
              userID : fbUser.userID
            })
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
        <Meetings path='/meetings' />
        {/* Passes a local function into a subcomponent */}
        <Register path='/register' registerUser={this.registerUser} /> 
      </Router>
      </>
    );
  }
}

export default App;