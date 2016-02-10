import React from 'react';
import Firebase from 'firebase';

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

var CreateOffers = React.createClass({
  getInitialState: function() {
    return {
      type: 'info',
      message: 'BUZZ'
    };
  },

  handleSubmit: function (event) {
    event.preventDefault();
    this.setState({ type: 'info', message: 'Sending...' }, this.sendFormData);
  },

  sendFormData: function () {
    var formData = {
      offer: document.getElementById('offerDescription').value,
      endTime: document.getElementById('endTime').value,
    };

    var request = new XMLHttpRequest();
    var _this = this;
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200 && request.responseText === 'ok') {
          _this.setState({ type: 'success', message: 'Your offer is live' });
        }
        else {
          _this.setState({ type: 'danger', message: 'Sorry, there has been an error. Please refresh and try again.' });
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

  componentDidMount: function() {
    document.getElementById('offerSubmitButton').addEventListener('click', function() {
      console.log('clicked');
      var offer = document.getElementById('offerDescription').value;
      var offerCode = document.getElementById('offerCode').value;
      var endTime = document.getElementById('endTime').value;
      var barName = document.cookie.match('havaBarName').input.split('havaBarName=')[1];
      firebaseRef.push({
        barName: barName,
        offer: offer,
        offerCode: offerCode,
        endTime: endTime
      })
    })
  },

  render: function() {
    return (
      <div>
         <div className='wrapper'>
           <h2>Create an Offer</h2>
           <form action="" onSubmit={this.handleSubmit}>
             <label>Offer description</label>
             <input className='form-control' id="offerDescription" placeholder='Write offer description here' required type='text'/>
             <label>End time</label>
             <input className='form-control' id="endTime" placeholder='Enter end time for offer here' />
             <label>Offer code</label>
             <input className='form-control' id='offerCode' placeholder='Enter offer code here' />
             <button id='offerSubmitButton' className='btn btn-md button'>{this.state.message}</button>
           </form>
         </div>
      </div>
    )
  }
});

export default CreateOffers;
