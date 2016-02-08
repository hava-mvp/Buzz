import React from 'react';
import Firebase from 'firebase'

var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");

var RetrieveOffers = React.createClass({

  componentWillMount: function() {
    firebaseRef.limitToLast(100).on("child_added", function(snapshot) {
      console.log(snapshot.key())
    })
  },

  render: function() {
    return (
      <div>
        Offers
      </div>
    )
  }
});

export default RetrieveOffers;
