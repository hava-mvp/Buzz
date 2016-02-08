import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';
import CreateOffers from './CreateOffers.jsx';
import { Input, ButtonInput } from 'react-bootstrap';

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");

var checkCookie = () => {
  if(document.cookie.match('havaBarName')) {
    console.log('COOKIE IS HERE');
    window.location = '/#create-offers';
  } else {
    return;
  }
}

var BarLogin = React.createClass({

  getInitialState : function() {
      return {
        loggedIn : "false"
      };
    },

  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {
    var self = this;
    document.getElementById('button').addEventListener('click', function(){
      var barName = document.getElementById('barName').value;
      firebaseRef.authWithPassword({
        email    : document.getElementById('email').value,
        password : document.getElementById('password').value
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          alert('Login failed. Check your username or password.')
        } else {
          document.cookie = 'havaBarName=' + barName + "; path='/'";
          self.setState({
            loggedIn : "true"
          });
          window.location = '/#create-offers';
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    })
  },

  render: function() {
    return (
      <div>

        <div className="wrapper">
           <h2>Hava Bar Login</h2>
           <Input type="text" label="Bar Name" placeholder="Enter the name of your bar" id="barName"/>
           <Input type="email" label="Email Address" placeholder="Enter email" id="email" />
           <Input type="password" label="Password" id="password"/>
           <ButtonInput value="Login" id="button" className="button"/>
        </div>

      </div>
    )
  }
});

export default BarLogin;
