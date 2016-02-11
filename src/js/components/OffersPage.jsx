import React from 'react';
import Firebase from 'firebase';
import IndividualOffer from './IndividualOffer.jsx'

var checkCookie = () => {
  if(document.cookie.match('havaid')) {
    return;
  } else {
    navigateToPreviousPage();
  }
}

var navigateToPreviousPage = () => {
  window.location = '/#customer';
}

var getLiveOffers = (callback) => {
  var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");
  firebaseRef.limitToLast(100).on("value", function(snapshot) {
    var data = snapshot.val();
    var currentTime = Date.now();
    console.log('NOW', currentTime);
    var filterValidKeys = (ifValidKey) => {
      return (data[ifValidKey]['expiry'] > currentTime);
    }
    var firebaseDataKeysArray = Object.keys(data).filter(filterValidKeys);
    var firebaseDataArray = firebaseDataKeysArray.map(function(offer){
      var barName = data[offer]['barName'];
      var validOffer = new Object();
      validOffer['barName'] = data[offer]['barName'];
      validOffer['offer'] = data[offer]['offer'];
      validOffer['offerCode'] = data[offer]['offerCode']
      validOffer['endTime'] = data[offer]['endTime'];
      return validOffer;
    });
    callback(firebaseDataArray);
  });
}

var OffersPage = React.createClass({
  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {
    var _this = this;
    if(this.isMounted()) {
    getLiveOffers(function(offerDetails){
      _this.setState({
        offers: offerDetails
      }, function() {
        console.log('state changed here it is', _this.state.offers);
      });
    });
    } else {
      console.log('NOT MOUNTED');
    }
  },

  render: function() {
    var _this = this;

    return !_this.state ? (
      <div>
        <input value="LOADING..."/>
      </div>
    ) : (
      <div>
        {_this.state.offers.map((offerKey) => (
          <IndividualOffer
          offerDetails={offerKey}
          />
        ))}
      </div>
    );
  }
});

export default OffersPage;
