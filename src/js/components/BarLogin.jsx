import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';
import CreateOffers from './CreateOffers.jsx';

var checkLocalStorage = () => {
  var barName = localStorage.getItem('havaBarName');
  if(barName !== null) {
    navigateToPage('/#create-offers');
  } else {
    return;
  }
}

var navigateToPage = (pageURL) => {
  window.location = pageURL;
}

var BarLogin = React.createClass({

  componentWillMount: function() {
    checkLocalStorage();
  },

  componentDidMount: function() {
    var self = this;
    document.getElementById('button').addEventListener('click', function(){
      document.getElementById('button').disabled = true;
      var barEmail = document.getElementById('email') && document.getElementById('email').value;
      var barPass = document.getElementById('password') && document.getElementById('password').value;
      var firebaseLoginRef = new Firebase("https://hava-peter.firebaseio.com/customer");
      var checkEmailAddress = (barEmail) => {
        console.log('checking bar name');
        var firebaseBarNameRef = new Firebase("https://hava-peter.firebaseio.com/bars");
        var barDetailsKey;
        firebaseBarNameRef.orderByChild("email").equalTo(barEmail).once("value", function(emailRegisteredWithBar) {
          var barDetailsInDB = emailRegisteredWithBar.val();
          barDetailsInDB ? barDetailsKey = Object.keys(barDetailsInDB) : alert('Please contact Hava, no bar was found registered to your account');
          var barNameInDB = barDetailsInDB && barDetailsInDB[barDetailsKey] && barDetailsInDB[barDetailsKey]['barName'];
          console.log('>>>>>>',barNameInDB);
          var cookifiedBarName = barNameInDB.replace(/\s/g, "#");
          document.cookie = 'havaBarName=' + JSON.stringify(cookifiedBarName) + "; path='/'";
          localStorage.setItem('havaBarName', JSON.stringify(cookifiedBarName));
          navigateToPage('/#create-offers');
        });
      }
      var barAuthorised = () => {
        firebaseLoginRef.authWithPassword({
          email    : barEmail,
          password : barPass
        }, function(error, authData) {
          if (error) {
            alert('Login failed. Check your username or password.');
            document.getElementById('button').disabled = false;
          } else {
            checkEmailAddress(barEmail);
          }
        });
      }
      barAuthorised();
    })
  },

  render: function() {
    return (
      <div>
        <div className='wrapper'>
          <h2>Hava Bar Login</h2>
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
