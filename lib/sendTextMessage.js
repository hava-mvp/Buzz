var messagebird = require('messagebird')('test_gsC3AJRWJxCzNwsxmVwk9oJQb');

var sendTextMessage = module.exports.sendTextMessage = function(offer, endTime, callback) {
  var params = {
    'originator': 'MessageBird',
    'recipients': [
      '07857669261'
    ],
    'body': 'Hello! ' + 'barName' + ' has a new offer: ' + offer + '. The offer ends at ' + endTime + '. Click the link below to get your code. http://hava-mvp.herokuapp.com/#/live-offers'
  };

  messagebird.messages.create(params, function (err, response) {
    if (err) {
      console.log('MESSAGE BIRD ERR>>>>>>',err);
      callback('err')
    }
    console.log('MESSAGE BIRD RESPONSE>>>>>>>',response);
    callback(response);
  });
}
