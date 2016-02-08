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

            <div className="wrapper">
               <h2>Hava Bar Login</h2>
               <input type="text" label="Bar Name" placeholder="Enter the name of your bar" id="barName"/>
               <input type="email" label="Email Address" placeholder="Enter email" id="email" />
               <input type="password" label="Password" id="password"/>
               <button id="button" className="button">Login</button>
            </div>

            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
              </div>
              <button type="submit" class="btn btn-default">Submit</button>
            </form>

      </div>
    )
  }
});

export default BarLogin;
