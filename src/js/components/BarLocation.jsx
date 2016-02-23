import React from 'react';
import Firebase from 'firebase';

var BarLocation = React.createClass({

  barLocationLink: function(){
    console.log('inside Bar Location!')
    var _this = this;
    var eachBarName = _this.props.offerDetails.replace(/\"/g, "");
    var barDetails = new Firebase("https://hava-peter.firebaseio.com/bars");
    barDetails.orderByChild('barName').equalTo(eachBarName).on("value", function(barOfferPublishHistory) {
      console.log('inside database!!')
      var barObj = barOfferPublishHistory.val();
      var barKey = Object.keys(barObj);
      var barLocation = "http://maps.apple.com/?q=" + barObj[barKey]['mapURL'];
      window.location = barLocation;
    });
  },

  render: function() {
    var _this = this;
    return (
      <div className="info">
        <h5 onClick={_this.barLocationLink} className="show-map-button">Map</h5>
      </div>
    )
  }

});

export default BarLocation;
