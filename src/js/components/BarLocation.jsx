import React from 'react';
import Firebase from 'firebase';

var BarLocation = React.createClass({

  barLocationLink: function(){
    console.log('inside Bar Location!')
    var _this = this;
    var eachBarName = _this.props.offerDetails.replace(/\"/g, "");
    var barDetails = new Firebase("https://havamvp.firebaseio.com/bars");
    barDetails.orderByChild('barName').equalTo(eachBarName).on("value", function(barOfferPublishHistory) {
      var barObj = barOfferPublishHistory.val();
      var barKey = Object.keys(barObj);
      var barLocation = barObj[barKey]['mapURL'];
      window.open(barLocation, '_blank');
    });
  },


  render: function() {
    var _this = this;
    return (
    <div>
      <button onClick={_this.barLocationLink} id="mapButton" className="show-map-button btn btn-sm">Map</button>
    </div>
    )
  }
})

export default BarLocation;
