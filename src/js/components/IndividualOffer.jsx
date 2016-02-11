import React from 'react';

var IndividualOffer = React.createClass({

  componentDidMount: function (){
    var self = this;
    var buttons = document.getElementsByClassName('show-code-button');
    for (var i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(){
        var id = this.outerHTML.split('id="')[1].split('"')[0];
        document.getElementById(id).innerHTML = 'CODEEEEE'
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
        <div id={this.props.offerDetails.barName.replace(/\"/g,"")} className="info">
          <button id={this.props.offerDetails.barName.replace(/\"/g,"")} className="show-code-button btn btn-xs">Show Offer Code</button>
        </div>
      </li>
    )
  }
})

export default IndividualOffer;
