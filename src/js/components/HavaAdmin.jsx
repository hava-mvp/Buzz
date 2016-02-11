import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/bars");

var HavaAdmin = React.createClass({

  componentDidMount: function() {
    document.getElementById('button').addEventListener('click', function(){
      var barName = document.getElementById('barName').value
      var email = document.getElementById('email').value
      var address = document.getElementById('address').value
      var mapURL = document.getElementById('mapURL').value
      firebaseRef.push({
        barName: barName,
        email: email,
        address: address,
        mapURL: mapURL
      }, function (error){
        if (error) {
          console.log('ERROR',error);
          alert('There was a problem. Please try again.')
        } else {
          alert('Bar successfully added.')
          document.getElementById("form").reset();
        }
      })
    })
  },

  render: function() {
    return (
      <div>
        <div className='wrapper'>
          <h2>Hava Admin</h2>
          <form id="form">
            <label>Bar Name</label>
            <input className='form-control' id="barName" placeholder='Enter the name of the bar' required type='text'/>
            <label>Email Address</label>
            <input className='form-control' id="email" placeholder='Enter the bar email login' required type='email' />
            <label>Address</label>
            <input className='form-control' id="address" placeholder='Enter the address of the bar' required type='text' />
            <label>Map URL</label>
            <input className='form-control' id="mapURL" placeholder='Enter the lon and lat google maps url' required type='text' />
            <button id='button' className='btn btn-md button'>Add Bar</button>
          </form>
        </div>
      </div>
    )
  }
});

export default HavaAdmin;
