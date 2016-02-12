import React from 'react';
import Firebase from 'firebase';


var getBarURL = (barName, callback) => {
  firebaseRef.on("value", function(snapshot) {
    var barObj = snapshot.val();

    for (var key in barObj) {
       if (barObj.hasOwnProperty(key)) {
          var obj = barObj[key];
          for (var prop in obj) {
             if (obj.hasOwnProperty(prop)) {
               var objProp = obj[prop]

               if(obj[prop] === barName){

                 callback(obj.mapURL);
               }
             }
          }
       }
    }
  });
}

var IndividualOffer = React.createClass({

  componentWillMount: function (){
    var _this = this;
    var liveOfferDetails = new Firebase("https://havamvp.firebaseio.com/bars");
    
  },

  componentDidMount: function (){
    var self = this;
    var id = this.props.offerDetails.barName.replace(/\"/g,"")
    document.getElementById(id).addEventListener("click", function(){
      var pId = self.props.offerDetails.offerCode
      document.getElementById(id).setAttribute("style", "display:none")
      document.getElementById(pId).setAttribute("style", "display:block")
    })
  },

  handleMapClick: function(){
    console.log("MAP CLICK");
    var barName = this.props.offerDetails.barName.replace(/\"/g,"")
    getBarURL(barName, function(url){
      var win = window.open(url,'_blank');
    });
  },


  render: function() {
    return (
    <div>
      <li className="listItem">
        <hr className="line" />
        <div className="barName">
          {this.props.offerDetails.barName.replace(/\"/g,"")}
        </div>
        <div className="info">
          {this.props.offerDetails.offer}
        </div>
        <div className="info">
          End Time: {this.props.offerDetails.endTime}
        </div>
        <div className="info">
          <button id={this.props.offerDetails.barName.replace(/\"/g,"")} className="show-code-button btn btn-lg">Show Code</button>
          <h3 id={this.props.offerDetails.offerCode} className="code">{this.props.offerDetails.offerCode}</h3>
        </div>
        <div className="info map">
          <button onClick={this.handleMapClick} id="mapButton" className="show-map-button btn btn-sm">Map</button>
        </div>
      </li>
    </div>
    )
  }
})

export default IndividualOffer;
