var messagebird = require('messagebird')('test_gsC3AJRWJxCzNwsxmVwk9oJQb');
var Firebase = require('firebase');

var sendTextMessage = module.exports.sendTextMessage = function(offer, endTime, barName, callback) {
  getAllRecipients(function(recipients){
    var params = {
      'originator': 'Hava',
      'recipients': recipients,
      'body': 'Hello! ' + barName + ' has a new offer: ' + offer + '. The offer ends at ' + endTime + '. Click the link below to get your code. http://hava-mvp.herokuapp.com/#/live-offers'
    };

    messagebird.messages.create(params, function (err, response) {
      if (err) {
        console.log('MESSAGE BIRD ERR>>>>>>',err);
        callback('err')
      }
      // console.log('MESSAGE BIRD RESPONSE>>>>>>>',response);
      callback(response);
    });
  });
}

function getAllRecipients (callback) {
  var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");
  firebaseRef.on('value', function(snapshot){
    var userIds = Object.keys(snapshot.val())
    var count = 0;
    var recipients = [];
    function getPhoneNumber(elem, index, arr) {
      count++;
      firebaseRef.child(elem + "/phoneNumber").on("value", function(snapshot) {
        recipients.push(snapshot.val());
        if (count === arr.length) {
          callback(recipients)
        }
      });
    }
    userIds.forEach(getPhoneNumber)
  })
}
