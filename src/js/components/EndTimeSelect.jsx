import React from 'react';

var Hours = React.createClass({
  render: function() {
    var time;
    (this.props.hour) ? time = this.props.hour : time = this.props.minutes;
    return(
      <option value={time}>{time}</option>
    )
  }
})

export default Hours;
