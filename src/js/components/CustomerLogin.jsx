import React from 'react';
import Firebase from 'firebase';

var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/customer");
var firebaseRefPush = firebaseRef.push();

var checkLocalStorage = () => {
  var havaid = localStorage.getItem('havaid');
  if(havaid !== null) {
    navigateToPage('/public/#live-offers');
  } else {
    console.log('no havaid');
    return;
  }
}

var navigateToPage = (goTo) => {
  console.log('navigating to next page');
  window.location.href = goTo;
}

var CustomerLogin = React.createClass({

  checkInput: function(customerLoginButton) {
    var userPhoneNumber = document.getElementById('phoneNumber').value.replace("+44", "0").replace(/\s/g, "");
    (userPhoneNumber.match(/^\d{11}$/)) ? this.checkUser(userPhoneNumber) : (alert('Please enter a valid phone number'), customerLoginButton.disabled=false);
  },

  checkUser: function(userPhoneNumber) {
    var _this = this;
    document.getElementById('button').disabled = true;
    var userPhoneNumberRegex = new RegExp('\\b' + userPhoneNumber.toString() + '\\b');
    firebaseRef.once('value', function(snapshot){
      var databaseSnapshot = JSON.stringify(snapshot.val());
      databaseSnapshot.match(userPhoneNumberRegex) ? _this.setCookie() : _this.submitUser();
    });
  },

  submitUser: function() {
    console.log('user details submitted');
    firebaseRefPush.set({
      email: document.getElementById('email').value,
      phoneNumber: document.getElementById('phoneNumber').value
    });
    this.setCookie();
  },

  setCookie: function() {
    console.log('setting cookie');
    firebaseRef.once('value', function(snapshot){
      var allUsers = snapshot.val();
      var allUsersArr = Object.keys(allUsers)
      var userNo = allUsersArr.length - 1;
      var user = allUsersArr[userNo];
      setTimeout(function(){
        (user !== null || undefined || "") ? (localStorage.setItem('havaid', user),
        document.cookie = "havaid=" + user + "expiry=31536e3;"+ "; path=/",
        navigateToPage('/public/#live-offers')) : checkLocalStorage();
      }, 200);
    });
  },

  componentWillMount: function() {
    checkLocalStorage();
  },

  componentDidMount: function() {
    var _this = this;
    var customerLoginButton = document.getElementById('button');
    customerLoginButton.addEventListener('click', function(){
      customerLoginButton.disabled = true;
      _this.checkInput(customerLoginButton);
    })
  },
  render: function() {
    return (
      <div>
        <div className='wrapper'>
          <h2>To get deals please enter your:</h2>
          <label>Email address</label>
          <input className='form-control' id="email" placeholder='Enter email' required type='email'/>
          <label>Mobile number</label>
          <input className='form-control' id="phoneNumber" placeholder='Enter phone number' />
          <button id='button' className='btn btn-md button'>Get Deals</button>
        </div>
      </div>
    )
  }
});

export default CustomerLogin;
