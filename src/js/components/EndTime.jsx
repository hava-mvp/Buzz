import React from 'react';
import Time from './EndTimeSelect.jsx';

var offerExpiryTime = React.createClass({
  render: function() {
    var hourSelection = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var minuteSelection = ['00', '10', '20', '30', '40', '50'];
    return (
      <div id='endTime'>
        <select id='hours' required>
          <option selected="selected" disabled="disabled" value="">HOUR</option>
          { hourSelection.map((hour) => (
              <Time hour={hour}/>
          )) }
        </select>
        <select id='minutes' required>
          <option selected="selected" disabled="disabled" value="">MINUTES</option>
          { minuteSelection.map((minutes) => (
              <Time minutes={minutes}/>
          )) }
        </select>
        <select id='amPm' required>
          <option selected="selected" disabled="disabled" value="">AM/PM</option>
          <option value="am">AM</option>
          <option value="pm">PM</option>
        </select>
      </div>
    );
  }
});

export default offerExpiryTime
