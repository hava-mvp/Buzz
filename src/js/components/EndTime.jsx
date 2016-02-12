import React from 'react';
import Time from './EndTimeSelect.jsx';

var offerExpiryTime = React.createClass({
  render: function() {
    var hourSelection = ['1','2','3','4','5','6','7','8','9','10','11','12'];
    var minuteSelection = ['00', '10', '20', '30', '40', '50'];
    return (
      <div className="endTime" id='endTime'>
        <select id='hours' required>
          <option selected="selected" disabled="disabled" value="">Hour</option>
          { hourSelection.map((hour) => (
              <Time hour={hour}/>
          )) }
        </select>
        <select id='minutes' required>
          <option selected="selected" disabled="disabled" value="">Minutes</option>
          { minuteSelection.map((minutes) => (
              <Time minutes={minutes}/>
          )) }
        </select>
        <select id='amPm' required>
          <option selected="selected" disabled="disabled" value="">am/pm</option>
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>
      </div>
    );
  }
});

export default offerExpiryTime
