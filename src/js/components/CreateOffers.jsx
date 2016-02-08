import React from 'react';
import Firebase from 'firebase';

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");

var CreateOffers = React.createClass({

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
           <h2>Create an Offer</h2>
           <input id='offerDescription' placeholder='offer description - e.g. 2 for 1 on pints'/>
           <input id='endTime' placeholder='end of offer - e.g. 16:00'/>
           <input id='offerCode' placeholder='241PINTS' />
           <input type='submit' id='offerSubmitButton'/>
      </div>
    )
  }
});

export default CreateOffers;
