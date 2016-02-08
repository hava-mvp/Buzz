import React from 'react';
import Firebase from 'firebase';
//import Offer from './Offer';



var RetrieveOffers = React.createClass({

  componentWillMount: function() {

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
      <div>
        Offers go here
      </div>
    )
  }
});

export default RetrieveOffers;
