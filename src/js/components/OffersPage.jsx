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
  window.location = '/public/#customer';
}

var getLiveOffers = (callback) => {
  var firebaseRef = new Firebase("https://havamvp.firebaseio.com/offers");
  firebaseRef.limitToLast(100).on("value", function(snapshot) {
    callback(snapshot.val());
  });
}

var OffersPage = React.createClass({
  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {
    var _this = this;
    if(this.isMounted()) {
    getLiveOffers(function(data){
      _this.setState({
        offers: data,
        offersKeys: Object.keys(data)

      }, function() {
        console.log('state changed here it is', _this.state);
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
        {_this.state.offersKeys.map((offerKey) => (
          <IndividualOffer
            offerKey={offerKey}
            offerDetails ={_this.state.offers[offerKey]}
          />
        ))}
      </div>
    );
  }
});

export default OffersPage;
