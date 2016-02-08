import React from 'react';
import Firebase from 'firebase';
import { Input, ButtonInput } from 'react-bootstrap';

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
        <div className="wrapper">
           <h2>Create an Offer</h2>
           <Input type="text" label="Offer Description" id='offerDescription' placeholder="Enter offer" />
           <Input type="text" label="End Time" placeholder="Enter end time" id='endTime' />
           <Input type="text" label="Offer Code" placeholder="Enter offer code" id='offerCode' />
           <ButtonInput value="BUZZ" id="offerSubmitButton" className="button"/>
        </div>
      </div>
    )
  }
});

export default CreateOffers;
