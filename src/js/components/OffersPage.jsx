import React from 'react';
import Firebase from 'firebase';
//import Offer from './Offer';

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");

var checkCookie = (callback) => {
  if(document.cookie.match('havaid')) {
    callback('');
  } else {
    navigateToPreviousPage();
  }
}

var navigateToPreviousPage = () => {
  window.location = '/public/#customer';
}

var displayOffers = () => {
  var offersList = React.createElement('ul');
  firebaseRef.limitToLast(100).on("child_added", function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var offerCode = childSnapshot.key();
      console.log(offerCode);
    });
  });
}

// var OfferDivs = React.createClass()

var OffersPage = React.createClass({

  componentWillMount: function() {
    checkCookie(function(message){
      displayOffers();
    });
    // var fetchOffersfromFB = function (){
    //
    //   var offersArray = [];
    //   var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");
    //
    //   firebaseRef.limitToLast(100).on("child_added", function(snapshot) {
    //     console.log(snapshot.key());
    //     offersArray.push(snapshot.key());
    //     console.log(offersArray);
    //
    //   })
    //}
  },


  render: function() {
    return (
      <h2>HELLO!</h2>
    )
  }
});

export default OffersPage;
