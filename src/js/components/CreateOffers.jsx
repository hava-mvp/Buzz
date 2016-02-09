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
  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {
    document.getElementById('offerSubmitButton').addEventListener('click', function() {
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
           <label>Offer Description</label>
           <input className='form-control' id="offerDescription" placeholder='Write offer description here' required type='text'/>
           <label>End Time</label>
           <input className='form-control' id="endTime" placeholder='Enter end time for offer here' />
           <label>Offer Code</label>
           <input className='form-control' id='offerCode' />
           <button id='offerSubmitButton' className='btn btn-md button'>BUZZ</button>
         </div>
      </div>
    )
  }
});

export default CreateOffers;
