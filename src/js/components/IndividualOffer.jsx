import React from 'react';
import Firebase from 'firebase';



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
    //callback(snapshot.val());
  });
}

var IndividualOffer = React.createClass({

  componentDidMount: function (){

    // var buttons = document.getElementsByClassName('show-code-button')[0].outerHTML
    // buttons.addEventListener('click', function(){
    //   console.log('>>>>>>',document.getElementsByClassName('show-code-button')[0].outerHTML);
    //   console.log('ID>>',document.getElementById('button'));
    //
    //   document.getElementById("showCode").innerHTML = "CODEEEEE";
    // })
  },
  handleMapClick: function(){
    var barName = this.props.offerDetails.barName.replace(/\"/g,"")
    getBarURL(barName, function(url){
      var win = window.open(url,'_blank');    });

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
        <div id="showCode" className="info">
          <button id="button" className="show-code-button btn btn-xs">Show Offer Code</button>
        </div>
        <div id="map" className="info">
          <button id="mapButton" className="show-map-button btn btn-xs">
            <a  onClick={this.handleMapClick}>
              Map
            </a>
          </button>
        </div>
      </li>
    </div>
    )
  }
})

export default IndividualOffer;

// onClick={this.handleMapClick}
