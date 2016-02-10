import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';
import CreateOffers from './CreateOffers.jsx';


var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");

var checkCookie = () => {
  if(document.cookie.match('havaBarName')) {
    navigateToNextPage();
  } else {
    return;
  }
}

var navigateToNextPage = () => {
  window.location = '/public/#create-offers';
}

var BarLogin = React.createClass({

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
          console.log('barname cookified')
          document.cookie = 'havaBarName=' + JSON.stringify(barName) + "; path='/'";
          console.log("Authenticated successfully with payload:", authData);
          navigateToNextPage();
        }
      });
    })
  },

  render: function() {
    return (
      <div>
        <div className='wrapper'>
          <h2>Hava Bar Login</h2>
          <label>Bar Name</label>
          <input className='form-control' id="barName" placeholder='Enter the name of your bar' required type='text'/>
          <label>Email Address</label>
          <input className='form-control' id="email" placeholder='Enter email' required type='email' />
          <label>Password</label>
          <input className='form-control' id='password' required type='password'/>
          <button id='button' className='btn btn-md button'>Login</button>
        </div>
      </div>
    )
  }
});

export default BarLogin;
