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

}

var OffersPage = React.createClass({
  componentWillMount: function() {
    checkCookie();
  },

  componentDidMount: function() {

    console.log("CUSTOMER---CONTACT",document.getElementById("customer-contact"));
    document.getElementById("customer-contact").addEventListener("click", function(){
      console.log("CLICKED ON CONTACT");
      window.location.assign("/public/#/customer-contact");
    })

    var _this = this;
    if(_this.isMounted()) {
    getLiveOffers(function(data){
      _this.setState({
        offers: data,
        offersKeys: Object.keys(data)

      }, function() {
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
          <p id="customer-contact" ></p>
      </div>
    )
   }

  var offerItems = _this.state.offersKeys.map((offerKey) => {
    return <IndividualOffer
      offerKey={offerKey}
      offerDetails ={_this.state.offers[offerKey]} />

  });
   return (
     <div>
       <div className="live-offers-wrapper">
         {offerItems}
       </div>
       <div className="site-footer offer-footer">
         <p type="submit" id="customer-contact">Contact Us</p>
       </div>
     </div>

   )
  }

});

export default OffersPage;
