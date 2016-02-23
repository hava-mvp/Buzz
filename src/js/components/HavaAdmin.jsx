import React from 'react';
import Firebase from 'firebase';
import { Router, Route, Link } from 'react-router';

var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/bars");

var HavaAdmin = React.createClass({

  componentDidMount: function() {
    document.getElementById('button').addEventListener('click', function(){
      document.getElementById('button').disabled = true;
      var barName = document.getElementById('barName').value
      var email = document.getElementById('email').value
      var address = document.getElementById('address').value
      var latLon = document.getElementById('latLon').value
      firebaseRef.push({
        barName: barName,
        email: email,
        address: address,
        mapURL: latLon
      }, function (error){
        if (error) {
          console.log('ERROR',error);
          alert('There was a problem. Please try again.')
          document.getElementById('offerSubmitButton').disabled = false;
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
            <label>Latitude and Longitude</label>
            <input className='form-control' id="latLon" placeholder='Enter the lat and lon of the bar' required type='text' />
            <button id='button' className='btn btn-md button'>Add Bar</button>
          </form>
        </div>
      </div>
    )
  }
});

export default HavaAdmin;
