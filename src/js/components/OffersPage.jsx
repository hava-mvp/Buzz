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

var afterStateSet = (state) => {
  console.log("stateKeys->>", Object.keys(state.offers));

}

var OffersPage = React.createClass({
  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {
    var _this = this;
    if(_this.isMounted()) {
    getLiveOffers(function(data){
      _this.setState({
        offers: data,
        offersKeys: Object.keys(data)

      }, function() {
        console.log('state changed here it is', _this.state);
        afterStateSet(_this.state);
      });
    });
    } else {
      console.log('NOT MOUNTED');
    }
  },

  render: function() {
    var _this = this;

   if(!_this.state){

    return (
      <div>
        <input value="LOADING..."/>
      </div>
    )
   }

  var offerItems = _this.state.offersKeys.map((offerKey) => {
    return <IndividualOffer
      offerKey={offerKey}
      offerDetails ={_this.state.offers[offerKey]} />

  });
   console.log("THIS-->>>>>",_this.state);
   return (
     <div>
       {offerItems}
     </div>
   )
  }

});

export default OffersPage;
