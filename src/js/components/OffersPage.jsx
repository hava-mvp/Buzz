import React from 'react';
import Firebase from 'firebase';
import IndividualOffer from './IndividualOffer.jsx'
import ContactFooter from './ContactFooter.jsx'

var checkLocalStorage = () => {
  var havaid = localStorage.getItem('havaid');
  if(havaid !== null) {
    return;
  } else {
    navigateToPreviousPage();
  }
}

var navigateToPreviousPage = () => {
  window.location = '/#customer';
}

var getLiveOffers = (callback) => {
  var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/offers");
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
    var firebaseDataNewestFirst = firebaseDataArray.reverse();
    callback(firebaseDataNewestFirst);
  });
}

var OffersPage = React.createClass({
  componentWillMount: function() {
    checkLocalStorage();
  },

  componentDidMount: function() {

    var _this = this;
    if(this.isMounted()) {
    getLiveOffers(function(offerDetails){
      _this.setState({
        offers: offerDetails
      });
    });
    } else {
      console.log('NOT MOUNTED');
    }
  },

  handleContactClick: function(){
    window.location.assign("/#customer-contact");
  },

  render: function() {
    var _this = this;

    return !_this.state ? (
      <div>
        <h4 className="loading">Loading...</h4>
          <ContactFooter navigateTo={'/public/#customer-contact'} footerName={'Contact Us'} />
      </div>
    ) : ((_this.state.offers.length === 0) ? (
      <div>
        <div className="wrapper">
          <p className="noLiveOffers">
            Keep calm - we've got this.
          </p>
          <p className="noLiveOffers">
            Our bars will be in touch soon :)
          </p>
        </div>
        <ContactFooter navigateTo={'/public/#customer-contact'} footerName={'Contact Us'} />
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
        <ContactFooter navigateTo={'/public/#customer-contact'} footerName={'Contact Us'} />
      </div>
    ));
  }
});

export default OffersPage;
