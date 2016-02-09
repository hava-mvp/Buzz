import React from 'react';
import Firebase from 'firebase';

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
  console.log(Object.keys(state.offers));
}

var ListOfOffers = React.createClass({
  getDefaultProps: function(){

  },

  render: function() {
    return (
      <div>
        <h1> HAVANOFFER </h1>
        <input id='ListOfOffers'></input>
      </div>
    )
  }
});

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
        console.log('state changed', _this.state);
        afterStateSet(_this.state);
      });
    });
    } else {
      console.log('NOT MOUNTED');
    }
  },

  render: function() {
    return (
      <div>
        <ListOfOffers offersList={this.state}/>
      </div>
    )
  }

});

export default OffersPage;
