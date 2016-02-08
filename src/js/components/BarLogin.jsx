import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';
import CreateOffers from './CreateOffers.jsx';

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

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   //ROUTE TO NEXT PAGE
  //   return true
  // },

  render: function() {
    return (
      <div>
        <div className='wrapper'>
          <h2>Hava Bar Login</h2>
          <input className='form-control' id="barName" placeholder='Enter the name of your bar' required type='text'/>
          <input className='form-control' id="email" placeholder='Enter email' required type='email' />
          <input className='form-control' id='password' required type='password'/>
          <button id='button' className='btn btn-md button'>Submit your details!</button>
        </div>
      </div>
    )
  }
});

export default BarLogin;
