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

        <div className='form-group'>
        <form id='sign_up'>
          <div className='input-container'>
            <div className='row'>
              <input
                className='form-control box-spacing'
                id="first_name"
                name='landing[first_name]'
                placeholder='First name'
                required type='text'
              />
              <input
                className='form-control box-spacing'
                id="last_name"
                placeholder='Last name'
                required type='text'
              />
            </div>
            <div className='row'>
              <input
                className='form-control box-spacing'
                id='email'
                placeholder='Your email'
                required type='email'
              />
              <input
                className='form-control box-spacing'
                id='postcode'
                placeholder='Your postcode'
                required type='text'
              />
            </div>
          </div>
          <div className='row'>
            <div className='dropdown-container'>
              <div id='select_arrow'></div>
              <select className='btn drop' id='survey'>
                <option value>How did you first hear about Hava?</option>
                <option value='Friends or Family'>Friends or Family</option>
                <option value='Social Media'>Social Media</option>
                <option value='Search Engine'>Search Engine</option>
                <option value='Meet-up or Conference'>Meet-up or Conference</option>
                <option value='Online Ad'>Online Ad</option>
                <option value='Other'>Other</option>
              </select>
            </div>
          </div>
          <button type='submit' className='btn btn-md submit'>Submit your details!</button>
        </form>
      </div>

      </div>
    )
  }
});

export default BarLogin;
