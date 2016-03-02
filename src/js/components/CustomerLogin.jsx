import React from 'react';
import Firebase from 'firebase';

var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/customer");
var firebaseRefPush = firebaseRef.push();

var checkLocalStorage = () => {
  var havaid = localStorage.getItem('havaid');
  if(havaid !== null) {
    navigateToPage('/#live-offers');
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
      databaseSnapshot.match(userPhoneNumberRegex) ? _this.getUserId(userPhoneNumber) : _this.submitUser(userPhoneNumber);
    });
  },

  submitUser: function(userPhoneNumber) {
    var _this = this;
    console.log('NEW USER');
    firebaseRefPush.set({
      email: document.getElementById('email').value,
      phoneNumber: userPhoneNumber
    });
    _this.getUserId(userPhoneNumber);
  },

  setCookie: function(userId) {
    console.log('SETTING COOKIE');
    localStorage.setItem('havaid', userId);
    document.cookie = "havaid=" + userId + "expiry=31536e3;"+ "; path=/";
    return (localStorage.getItem('havaid') && document.cookie.match('havaid')) ? 'ok' : 'not ok'
  },

  getUserId: function(userPhoneNumber) {
    console.log('INSIDE GET USER ID');
    var customerKey;
    var _this = this;
    firebaseRef.orderByChild("phoneNumber").equalTo(userPhoneNumber).once("value", function(phoneNumberInDB){
      var customerDetailsInDB = phoneNumberInDB.val();
      customerDetailsInDB ? customerKey = Object.keys(customerDetailsInDB) : console.log('NO PHONE NUMBER IN DATABASE' + userPhoneNumber);
      if (customerKey !== (undefined || null || "")) {
        console.log('CUSTOMER KEY NOT NULL ' + customerKey)
        var cookiesSet = _this.setCookie(customerKey);
        cookiesSet === 'ok' ? navigateToPage('/#live-offers') : _this.setCookie(userPhoneNumber);
      }
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
