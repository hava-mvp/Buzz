import React from 'react';
import Firebase from 'firebase';
import { Input, ButtonInput } from 'react-bootstrap';

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");
var firebaseRefPush = firebaseRef.push();


var checkCookie = () => {
  if(document.cookie.match('havaid')) {
    window.location = '/#live-offers'
  } else {
    return;
  }
}

var checkInput = () => {
  var userPhoneNumber = document.getElementById('phoneNumber').value.replace("+44", "0").replace(/\s/g, "");
  (userPhoneNumber.match(/^\d{11}$/)) ? checkUser(userPhoneNumber) : alert('Please enter a valid phone number');
}

var checkUser = (userPhoneNumber) => {
  var userPhoneNumberRegex = new RegExp('\\b' + userPhoneNumber + '\\b');
  firebaseRef.on('value', function(snapshot){
    var databaseSnapshot = JSON.stringify(snapshot.val());
    databaseSnapshot.match(userPhoneNumberRegex) ? window.location = '/#live-offers' : submitUser();
  });
}


var submitUser = () => {
  console.log('user details submitted');
  firebaseRefPush.set({
    email: document.getElementById('email').value,
    phoneNumber: document.getElementById('phoneNumber').value
  })
  setCookie();
}

var setCookie = () => {
  firebaseRef.on('child_added', function(snapshot){
    var allUsers = snapshot.val();
    var allUsersArr = Object.keys(allUsers)
    var userNo = allUsersArr.length - 1;
    var user = allUsersArr[userNo];
    document.cookie = "havaid=" + user + "; path=/";
  })
}

var CustomerLogin = React.createClass({
  componentWillMount: function() {
    checkCookie();
  },
  componentDidMount: function() {
    document.getElementById('button').addEventListener('click', function(){
      checkInput();
    })
  },
  render: function() {
    return (
      <div>
        <div className="wrapper">
           <h2>To see Hava offers please enter:</h2>
           <Input type="email" label="Email Address" placeholder="Enter email" id="email" />
           <Input type="text" label="Phone Number" placeholder="Enter phone number" id="phoneNumber"/>
           <ButtonInput value="Get Deals" id="button" className="button"/>
        </div>
      </div>
    )
  }
});

export default CustomerLogin;
