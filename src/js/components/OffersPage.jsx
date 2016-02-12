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
    var data = snapshot.val();
    var currentTime = Date.now();
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

var afterStateSet = (state) => {

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
      });
    });
    } else {
      console.log('NOT MOUNTED');
    }
  },

  handleContactClick: function(){
    window.location.assign("/public/#/customer-contact");
  },

  render: function() {
    var _this = this;

    return !_this.state ? (
      <div>
        <input id="offersLoading" value="LOADING..."/>
      </div>
    ) : ((_this.state === null) ? (
      <div>
        <input id="noLiveOffers" value="Sorry! You've caught us when there are no live offers! Come back in a bit and check us out again!"/>
      </div>
    ) : (
      <div>
        <div className="live-offers-wrapper">
          {_this.state.offers.map((offerKey) => (
            <IndividualOffer
              offerDetails = {offerKey}
            />
        ))}
        </div>
        <div className="site-footer offer-footer">
          <p type="submit" onClick={this.handleContactClick}>Contact Us</p>
        </div>
      </div>
    ));
  }
});

export default OffersPage;
