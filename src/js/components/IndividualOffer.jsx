import React from 'react';

var IndividualOffer = React.createClass({

  componentDidMount: function (){
    var self = this;
    var buttons = document.getElementsByClassName('show-code-button');
    for (var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(){
        var buttonId = this.outerHTML.split('id="')[1].split('"')[0];
        var pId = self.props.offerDetails.offerCode
        console.log(pId);
        console.log(buttonId);
        document.getElementById(buttonId).setAttribute("style", "display:none")
        document.getElementById(pId).setAttribute("style", "display:block")
      });
    }
  },

  render: function() {
    return (
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
          <button id={this.props.offerDetails.barName.replace(/\"/g,"")} className="show-code-button btn btn-xs">Show Code</button>
          <p id={this.props.offerDetails.offerCode} className="code">{this.props.offerDetails.offerCode}</p>
        </div>
      </li>
    )
  }
})

export default IndividualOffer;
