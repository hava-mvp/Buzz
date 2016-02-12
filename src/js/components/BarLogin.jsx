import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';
import CreateOffers from './CreateOffers.jsx';



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
      var barName = document.getElementById('barName') && document.getElementById('barName').value;
      var barEmail = document.getElementById('email') && document.getElementById('email').value;
      var barPass = document.getElementById('password') && document.getElementById('password').value;
      var firebaseLoginRef = new Firebase("https://havamvp.firebaseio.com/customer");
      var checkBarRegistered = () => {
        console.log('checking bar is registered');
        var firebaseBarNameRef = new Firebase("https://havamvp.firebaseio.com/bars");
        firebaseBarNameRef.orderByChild("barName").equalTo(barName).once("value", function(barNameRegistered) {
          barNameRegistered.val() ? checkEmailAddress(barNameRegistered.val()) : alert("Bar not registered! If you'd like to join, please contact the Hava Team to register! If you are registered, please check your spelling and try again.");
        });
      }
      var checkEmailAddress = (barSnapshot) => {
        var barObjectKey = Object.keys(barSnapshot);
        var barNameInDB = barSnapshot && barSnapshot[barObjectKey] && barSnapshot[barObjectKey]['barName'];
        var emailOfBarInDB = barSnapshot && barSnapshot[barObjectKey] && barSnapshot[barObjectKey]['email'];
        ((barNameInDB === barName) && (emailOfBarInDB === barEmail)) ? barAuthorised() : alert("Login credentials do not match the name of the Bar with which you registered");
      }
      var barAuthorised = () => {
        firebaseLoginRef.authWithPassword({
          email    : barEmail,
          password : barPass
        }, function(error, authData) {
          if (error) {
            alert('Login failed. Check your username or password.')
          } else {
            var cookifiedBarName = document.getElementById('barName').value && document.getElementById('barName').value.replace(/\s/g, "#");
            document.cookie = 'havaBarName=' + JSON.stringify(cookifiedBarName) + "; path='/'";
            navigateToNextPage();
          }
        });
      }
      checkBarRegistered();
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
