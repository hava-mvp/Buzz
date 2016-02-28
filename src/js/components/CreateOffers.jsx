import React from 'react';
import Firebase from 'firebase';
import EndTime from './EndTime.jsx';
import ContactFooter from './ContactFooter.jsx'

var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/offers");

var checkLocalStorage = function() {
  var barName = localStorage.getItem('havaBarName');
  console.log('CHECKLOCALSTORAGE', barName);
  if(barName !== null) {
    return;
  } else {
    navigateToPreviousPage();
  }
}

var navigateToPreviousPage = () => {
  window.location = '/#bar';
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
    document.getElementById('offerSubmitButton').disabled = true;
    var offer = document.getElementById('offerDescription').value;
    var offerCode = document.getElementById('offerCode').value;
    var offerExpiryHour = document.getElementById('hours').value && parseInt(document.getElementById('hours').value);
    var offerExpiryMinutes = document.getElementById('minutes').value && parseInt(document.getElementById('minutes').value);
    var offerExpiryMeridiem = document.getElementById('amPm').value;
    if (offer === "" || offerCode === "" || offerExpiryHour === "" || offerExpiryMinutes === "" || offerExpiryMeridiem === "") {
      alert("Please fill in all details");
      document.getElementById('offerSubmitButton').disabled = false;
    } else {
      this.canPublishOffer();
    }
  },

  canPublishOffer: function() {
    var _this = this;
    var havaBarName = _this.state.havaBarName;
    var barName = havaBarName ? havaBarName.replace(/#/g, " ") : (alert('Something went wrong, please refresh the page and try again.'), checkLocalStorage());
    var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/offers");
    firebaseRef.orderByChild('barName').equalTo(barName).once("value", function(barOfferPublishHistory) {
      barOfferPublishHistory.val() ? _this.checkForExistingOffers(barOfferPublishHistory.val()) : _this.confirmOffer();
    });
  },

  checkForExistingOffers: function(barOfferHistory) {
    var _this = this;
    var currentTime = Date.now();
    var unexpiredOffers = (unexpiredOffer) => {
      return (barOfferHistory[unexpiredOffer]['expiry'] > currentTime);
    }
    var unexpiredOffersArray = Object.keys(barOfferHistory).filter(unexpiredOffers);
    unexpiredOffersArray.length === 0 ? _this.confirmOffer() : (alert('You still have an active offer! Please wait for it to expire before publishing a new one.'), document.getElementById('offerSubmitButton').disabled = false);
  },

  confirmOffer: function () {
    var _this = this;
    var offer = document.getElementById('offerDescription').value;
    var offerCode = document.getElementById('offerCode').value;
    var offerExpiryHour = document.getElementById('hours').value && parseInt(document.getElementById('hours').value);
    var offerExpiryMinutes = document.getElementById('minutes').value;
    var offerExpiryMeridiem = document.getElementById('amPm').value;
    var confirmation = confirm(`Are you sure you want to publish the following offer?

      Offer Description: ${offer}
      Offer Expiry Time: ${offerExpiryHour}:${offerExpiryMinutes} ${offerExpiryMeridiem}
      Offer Code: ${offerCode}

Once published, customers will be notified, and the offer will not be retractable.
      `);
      if (confirmation === true) {
        _this.addToDB();
      } else {
        document.getElementById('offerSubmitButton').disabled = false;
        return;
      }
  },


  databaseOfferTime: function(checkedHour, inputMinutes, callback) {
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
    callback(absoluteOfferSetTime, absoluteOfferExpiryTime);
  },

  checkNotMidnight: function(inputHour, inputMeridiem) {
    if (inputMeridiem === 'am') {
      return (inputHour === 12) ? 0 : inputHour;
    } else {
      return (inputHour === 12) ? inputHour : (inputHour+12);
    }
  },

  addToDB: function() {
    var _this = this;
    _this.setState({
      type: 'info',
      message: 'Sending...'
    });
    var offer = document.getElementById('offerDescription').value;
    var offerCode = document.getElementById('offerCode').value;
    var barName = _this.state.havaBarName;
    var endTime = String(document.getElementById('hours').value + ":" + document.getElementById('minutes').value + " " + document.getElementById('amPm').value)
    var offerExpiryHour = document.getElementById('hours').value && parseInt(document.getElementById('hours').value);
    var offerExpiryMinutes = document.getElementById('minutes').value && parseInt(document.getElementById('minutes').value);
    var offerExpiryMeridiem = document.getElementById('amPm').value;
    var checkedOfferExpiryHour = this.checkNotMidnight(offerExpiryHour, offerExpiryMeridiem);
    _this.databaseOfferTime(checkedOfferExpiryHour, offerExpiryMinutes, function(offerSetTime, offerExpiration){
      firebaseRef.push({
        barName: barName,
        offer: offer,
        offerCode: offerCode,
        endTime: endTime,
        expiry: offerExpiration,
        offerSet: offerSetTime
      }, function(){
        _this.setState({
          type: 'success',
          message: 'Your offer is live'
          offerExpiryTime: offerExpiration
        });
        _this.sendFormData()
      });
      document.getElementById('offerSubmitButton').disabled = false;
    });
  },

  sendFormData: function () {
    console.log('OFFER ADDED TO DB');
    var _this = this;
    console.log('THIS STATE', _this.state);
    var endTime = String(document.getElementById('hours').value + ":" + document.getElementById('minutes').value + " " + document.getElementById('amPm').value)
    var formData = {
      offer: document.getElementById('offerDescription').value,
      endTime: endTime,
      barName: _this.state.havaBarName
    };

    var request = new XMLHttpRequest();
    var _this = this;
    request.onreadystatechange = function() {
      if (request.status === 200 && request.readyState === 4) {
        var messagesNotSent = new RegExp('notOk', 'g');
        if (request.responseText.match(messagesNotSent)) {
          console.log('MESSAGES COULD NOT BE SENT');
          _this.setState({
            type: 'danger',
            message: 'Offer live, but messages have failed to send.'});
        }
        else {
          console.log('MESSAGES SENT');
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
    checkLocalStorage()
  },

  componentDidMount: function() {
    var barName = localStorage.getItem('havaBarName');
    var cleanBarName;
    var regex = /(\")|(#)/g
    if (barName.match(regex)) {
      cleanBarName = barName.replace(/\"/g, "").replace(/#/g, " ");
    } else {
      cleanBarName = barName;
    }    this.setState({
      havaBarName: cleanBarName
    });
  },

  render: function() {
    var currentTime = Date.now();
    var offerExpiryTime = this.state.offerExpiryTime;
    var humanReadableExpiryTimeBreakdown = ((offerExpiryTime-currentTime)/1000/3600).toFixed(4);
    var humanReadableExpiryHour = humanReadableExpiryTimeBreakdown.toString().split('.')[0];
    var humanReadableExpiryMinutes = (parseInt(humanReadableExpiryTimeBreakdown.toString().split('.')[1])*60/10000).toFixed(0);

    return (!offerExpiryTime || currentTime > offerExpiryTime) ? (
      <div>
         <div className='wrapper'>
           <h2>Create an Offer</h2>
            <form action="" onSubmit={this.handleSubmit}>
             <label>Offer description</label>
             <input className='form-control' id="offerDescription" placeholder='Write offer description here' type='text'/>
             <label>Offer code</label>
             <input className='form-control' id='offerCode' placeholder='Enter offer code here' />
             <label>Offer expiry time: </label>
             <EndTime />
             <button id='offerSubmitButton' className='btn btn-md button'>{this.state.message}</button>
           </form>
         </div>
         <ContactFooter navigateTo={'/#bar-contact'} footerName={'Contact Us'} />
      </div>
    ) : (
      <div>
        <div className="wrapper">
          <p className="noLiveOffers">
            Your offer is now live!
          </p>
        </div>
        <ContactFooter navigateTo={'/#bar-contact'} footerName={'Contact Us'} />
      </div>
    )
  }
});

export default CreateOffers;
