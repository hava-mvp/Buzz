import React from 'react';
import Firebase from 'firebase';
import EndTime from './EndTime.jsx'

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");

var checkCookie = function() {
  if(document.cookie.match('havaBarName')) {
    return;
  } else {
    navigateToPreviousPage();
  }
}

var navigateToPreviousPage = () => {
  window.location = '/public/#bar';
}

var databaseOfferTime = (checkedHour, inputMinutes, callback) => {
  var absoluteOfferSetTime = Date.now();  // current time in milliseconds;
  var today = new Date(); // current date and time;

  var hourThatOfferIsSet = today.toString() && today.toString().split(" ")[4] && today.toString().split(" ")[4].split(":")[0] && parseInt(today.toString().split(" ")[4].split(":")[0]);
  var minsThatOfferIsSet = today.toString() && today.toString().split(" ")[4] && today.toString().split(" ")[4].split(":")[1] && today.toString().split(" ")[4].split(":")[1].split(":")[0] && parseInt(today.toString().split(" ")[4].split(":")[1].split(":")[0]);
  // console.log('OFFER SET TIME' + hourThatOfferIsSet + ":" + minsThatOfferIsSet);
  // console.log('OFFER EXPIRY AT' + checkedHour + ":" + inputMinutes);

  var relativeOfferSetTimeInMilliseconds = (hourThatOfferIsSet*3600 + minsThatOfferIsSet*60)*1000;
  var relativeOfferExpiryTimeInMilliseconds = 1000*((checkedHour*3600)+(inputMinutes*60));

  var lengthOfOffer = relativeOfferExpiryTimeInMilliseconds > relativeOfferSetTimeInMilliseconds ? (relativeOfferExpiryTimeInMilliseconds - relativeOfferSetTimeInMilliseconds) : ((24*3600*1000 - relativeOfferSetTimeInMilliseconds) + relativeOfferExpiryTimeInMilliseconds);
  console.log('offerExpires ', (lengthOfOffer/1000/3600));
  var absoluteOfferExpiryTime = absoluteOfferSetTime + lengthOfOffer;
  callback(absoluteOfferExpiryTime);
}

var checkNotMidnight = (inputHour, inputMeridiem) => {
  if (inputMeridiem === 'am') {
    return (inputHour === 12) ? 0 : inputHour;
  } else {
    return (inputHour === 12) ? inputHour : (inputHour+12);
  }
}

var addToDB = function () {
  var offer = document.getElementById('offerDescription').value;
  var offerCode = document.getElementById('offerCode').value;
  var barName = document.cookie.match('havaBarName') && document.cookie.match('havaBarName').input && document.cookie.match('havaBarName').input.split('havaBarName=')[1] && document.cookie.match('havaBarName').input.split('havaBarName=')[1] && document.cookie.match('havaBarName').input.split('havaBarName=')[1].split(";")[0] && document.cookie.match('havaBarName').input.split('havaBarName=')[1].split(";")[0].replace(/#/g, " ");
  var endTime = String(document.getElementById('hours').value + ":" + document.getElementById('minutes').value + " " + document.getElementById('amPm').value)
  var offerExpiryHour = document.getElementById('hours').value && parseInt(document.getElementById('hours').value);
  var offerExpiryMinutes = document.getElementById('minutes').value && parseInt(document.getElementById('minutes').value);
  var offerExpiryMeridiem = document.getElementById('amPm').value;
  var checkedOfferExpiryHour = checkNotMidnight(offerExpiryHour, offerExpiryMeridiem);
  databaseOfferTime(checkedOfferExpiryHour, offerExpiryMinutes, function(offerExpiration){
    firebaseRef.push({
      barName: barName,
      offer: offer,
      offerCode: offerCode,
      endTime: endTime,
      expiry: offerExpiration
    });
  });
}

var CreateOffers = React.createClass({
  getInitialState: function() {
    return {
      type: 'info',
      message: 'BUZZ'
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({
      type: 'info',
      message: 'Sending...'
    }, this.canPublishOffer());
  },

  canPublishOffer: function() {
    var _this = this;
    var barName = document.cookie.match('havaBarName') && document.cookie.match('havaBarName').input && document.cookie.match('havaBarName').input.split('havaBarName=')[1] && document.cookie.match('havaBarName').input.split('havaBarName=')[1] && document.cookie.match('havaBarName').input.split('havaBarName=')[1].split(";")[0] && document.cookie.match('havaBarName').input.split('havaBarName=')[1].split(";")[0].replace(/#/g, " ");
    var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");
    firebaseRef.orderByChild('barName').equalTo(barName).once("value", function(barOfferPublishHistory) {
      barOfferPublishHistory.val() ? _this.checkForExistingOffers(barOfferPublishHistory.val()) : _this.sendFormData();
    });
  },

  checkForExistingOffers: function(barOfferHistory) {
    var _this = this;
    var currentTime = Date.now();
    console.log('BAROFFERHISTORY', barOfferHistory);
    var unexpiredOffers = (unexpiredOffer) => {
      return (barOfferHistory[unexpiredOffer]['expiry'] > currentTime);
    }
    var unexpiredOffersArray = Object.keys(barOfferHistory).filter(unexpiredOffers);
    unexpiredOffersArray.length === 0 ? _this.sendFormData : alert('You still have an active offer! Please wait for it to expire before publishing a new one.');
  },

  sendFormData: function () {
    console.log('inside sendFormData');
    var endTime = String(document.getElementById('hours').value + ":" + document.getElementById('minutes').value + " " + document.getElementById('amPm').value)
    var formData = {
      offer: document.getElementById('offerDescription').value,
      endTime: endTime,
    };

    var request = new XMLHttpRequest();
    var _this = this;
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200 && request.responseText === 'ok') {
          _this.setState({ type: 'success', message: 'Your offer is live' });
          console.log('ADDED TO DB');
          addToDB();
        }
        else {
          console.log('DONT ADD TO DB');
          _this.setState({ type: 'danger', message: 'Error. Please refresh and try again.' });
        }
      }
    };
    request.open('POST', '/sendTextMessage', true);
    request.send(this.requestBuildQueryString(formData));
  },

  requestBuildQueryString: function (params) {
    var queryString = [];
    for(var property in params)
      if (params.hasOwnProperty(property)) {
        queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(params[property]));
      }
    return queryString.join('&');
  },

  componentWillMount: function() {
    checkCookie();
  },

  handleContactClick: function(){
    window.location.assign("/public/#bar-contact");
  },

  render: function() {
    return (
      <div>
         <div className='wrapper'>
           <h2>Create an Offer</h2>
            <form action="" onSubmit={this.handleSubmit}>
             <label>Offer description</label>
             <input className='form-control' id="offerDescription" placeholder='Write offer description here' required type='text'/>
             <label>Offer code</label>
             <input className='form-control' id='offerCode' placeholder='Enter offer code here' />
             <label>Offer expiry time: </label>
             <EndTime />
             <button id='offerSubmitButton' className='btn btn-md button'>{this.state.message}</button>
           </form>
         </div>
         <div className="site-footer">
           <p onClick={this.handleContactClick} id="contactBtn" className="navbar-brand">Contact Us</p>
         </div>
      </div>
    )
  }
});

export default CreateOffers;
