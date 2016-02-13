import React from 'react';
import Firebase from 'firebase';
import BarLocation from './BarLocation.jsx';


var getBarURL = (barName, callback) => {
  var firebaseRef = new Firebase("https://havamvp.firebaseio.com/bars");
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

  componentDidMount: function (){
    var self = this;
    var id = self.props.offerDetails.barName.replace(/\"/g,"")
    document.getElementById(id).addEventListener("click", function(){
      var pId = self.props.offerDetails.offerCode
      document.getElementById(id).setAttribute("style", "display:none")
      document.getElementById(pId).setAttribute("style", "display:block")
    });
  },

  handleMapClick: function(){
    console.log("MAP CLICK");
    var barName = this.props.offerDetails.barName.replace(/\"/g,"")
    getBarURL(barName, function(url){
      var win = window.open(url,'_blank');
    });
  },


  render: function() {
    var _this = this;
    return (
    <div>
      <li className="listItem">
        <hr className="line" />
        <div className="barName">
          {_this.props.offerDetails.barName.replace(/\"/g,"")}
        </div>
        <div className="info">
          {_this.props.offerDetails.offer}
        </div>
        <div className="info">
          End Time: {_this.props.offerDetails.endTime}
        </div>
        <div className="info">
          <button id={_this.props.offerDetails.barName.replace(/\"/g,"")} className="show-code-button btn btn-sm">Show Code</button>
          <h3 id={_this.props.offerDetails.offerCode} className="code">{_this.props.offerDetails.offerCode}</h3>
        </div>
        <div className="info">
          <h5 onClick={this.handleMapClick} className="show-map-button" >Map</h5>
        </div>
      </li>
    </div>
    )
  }
})

export default IndividualOffer;
