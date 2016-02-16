var env = require('env2')('.env');
var messagebird = require('messagebird')(process.env.messagebird);
var Firebase = require('firebase');

var sendTextMessage = module.exports.sendTextMessage = function(offer, endTime, barName, callback) {
  getAllRecipients(function(recipients) {


    var barNameClean = barName.match(" ") ? barName.replace(/#/g, " ") : barName;
    var offerClean = offer.match(" ") ? offer.replace(/%20/g, " ") : offer;
    var endTimeClean = endTime.replace(/%3A/g, ":").replace(/%20/g, "");

    function checkArrLength (arr) {
      if (arr.length > 50) {
        var newArr = arr.splice(0, 50)
        var remaining = arr.splice(0, arr.length)
        sendTextMessage(newArr, remaining)
      } else {
        sendTextMessage(arr, 0)
      }
    }

    function sendTextMessage (arr, remaining) {
      if (remaining === 0) {
        console.log('done')
        callback('done');
        return;
      } else {
        var params = {
          'originator': 'Hava',
          'recipients': [arr],
          'body': 'Hello! ' + barNameClean + ' has a new offer: ' + offerClean + '. The offer ends at ' + endTimeClean + '. Click the link below to get your code. http://hava-mvp.herokuapp.com/#/live-offers'
        };

        messagebird.messages.create(params, function (err, response) {
          if (err) {
            console.log('MESSAGE BIRD ERR>>>>>>',err);
            callback('err')
          } else {
            console.log('MESSAGE BIRD RESPONSE>>>>>>>',response);
            checkArrLength(remaining)
          }
        });
      }
    }
    checkArrLength(recipients)
  });
}

function getAllRecipients(callback) {
  var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/customer");
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
