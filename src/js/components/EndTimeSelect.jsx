import React from 'react';

var Hours = React.createClass({
  render: function() {
    var time = (this.props.hour) ? this.props.hour : this.props.minutes;
    return(
      <option value={time}>{time}</option>
    )
  }
})

export default Hours;
