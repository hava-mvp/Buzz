var messagebird = require('messagebird')('test_TsbfRQTsu6HvgYbJScILZy5P');
var Firebase = require('firebase');

var sendTextMessage = module.exports.sendTextMessage = function(offer, endTime, barName, callback) {
  getAllRecipients(function(recipients) {

    var barNameClean = barName.replace(/#/g, " ");
    var offerClean = offer.replace(/%20/g, " ");
    var endTimeClean = endTime.replace(/%3A/g, ":").replace(/%20/g, "");

    var params = {
      'originator': 'Hava',
      'recipients': '07857669261',
      'body': 'Hello! ' + barNameClean + ' has a new offer: ' + offerClean + '. The offer ends at ' + endTimeClean + '. Click the link below to get your code. http://hava-mvp.herokuapp.com/#/live-offers'
    };

    messagebird.messages.create(params, function (err, response) {
      if (err) {
        console.log('MESSAGE BIRD ERR>>>>>>',err);
        callback('err')
      }
      console.log('MESSAGE BIRD RESPONSE>>>>>>>',response);
      callback(response);
    });
  });
}

function getAllRecipients(callback) {
  var firebaseRef = new Firebase("https://havamvp.firebaseio.com/customer");
  firebaseRef.on('value', function(snapshot) {
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
