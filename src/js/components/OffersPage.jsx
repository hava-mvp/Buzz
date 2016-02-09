import React from 'react';
import Firebase from 'firebase';
//import Offer from './Offer';


var checkCookie = () => {
  if(document.cookie.match('havaid')) {
    return;
  } else {
    navigateToPreviousPage();
  }
}

var navigateToPreviousPage = () => {
  window.location = '/public/#customer';
}

// var IndividualOffer = React.createClass({
//   render: function() {
//     return (
//       <h3>HI</h3>
//     )
//   }
// })

var ListOfOffers = React.createClass({

  render: function() {
    return (
      <div id='listOfOffers'>HELLO WORLD
      </div>
    )
  }
})

// {this.props.data.map(function(element, index){
//   return <IndividualOffer />
// })}
// <ul>
// {this.props.offer.map(function(element, i){
//   return 'SHEEP!';
//   // return <IndividualOffer key={i} data={element}  />
// })}
// </ul>

var getLiveOffers = (callback) => {
  var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");
  firebaseRef.limitToLast(100).on("value", function(snapshot) {
    callback (snapshot.val());
  });
}

var OffersPage = React.createClass({
  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {
    console.log('inside');
    var _this = this;
    if(_this.isMounted()) {
    getLiveOffers(function(data){
      _this.setState({
        offers: data
      }, function() {
        console.log('state changed');
      });
    });
    } else {
      console.log('NOT MOUNTED');
    }
  },

  render: function() {
    return (
      <div>
        <ListOfOffers />
      </div>
    )
  }

});

export default OffersPage;
