var env = require('env2')//('.env');
var messagebird = require('messagebird')(process.env.messagebird);
var Firebase = require('firebase');

var sendTextMessage = module.exports.sendTextMessage = function(offer, endTime, barName, callback) {
  getAllRecipients(function(recipients) {
<<<<<<< HEAD
  console.log('RECIPIENTS>>>>>>>>>>', recipients)
=======
    // console.log('RECIPIENTS>>>>>>>>>>>>>', recipients);
>>>>>>> master

    var barNameClean = barName.match(/#/g) ? barName.replace(/#/g, " ") : barName;
    var offerClean = offer.match(/%20/g) ? decodeURIComponent(offer) : offer;
    var endTimeClean = endTime.replace(/%3A/g, ":").replace(/%20/g, "");

    function checkArrLength (arr) {
      console.log('ARRAY LENGTH', arr.length);
      // array length > 50?
      if (arr.length > 50) {
<<<<<<< HEAD
        var newArr = arr.splice(0, 50)
        var remaining = arr.splice(0, arr.length)
        console.log('newArr>>>>>>>>>>>>>',newArr)
        console.log('remaining>>>>>>>>>>>>>',remaining)
        sendOfferAlert(newArr, remaining)
=======
        console.log('FIRST HALF', arr.splice(0,50).length);
        console.log('REMAINING', arr.length);
        sendOfferAlert(arr.splice(0,50), arr);
      // array length === 0?
      } else if (arr.length === 0){
        console.log('no more recipients to send text to');
        callback('done');
      // array length <= 50?
>>>>>>> master
      } else {
        console.log('recipients remaining');
        sendOfferAlert(arr, []);
      }
    }

    function sendOfferAlert (arr, remaining) {
      console.log('@@@@@@@@@@@', remaining.length);
      var params = {
        'originator': 'Hava',
        'recipients': [arr],
        'body': 'Hello! ' + barNameClean + ' has a new offer: ' + offerClean + '. The offer ends at ' + endTimeClean + '. Click the link below to get your code. http://hava-mvp.herokuapp.com/#live-offers'
      };

      messagebird.messages.create(params, function (err, response) {
        if (err) {
          console.log('MESSAGE BIRD ERR>>>>>>',err);
          callback('err')
        } else {
          console.log('MESSAGE BIRD RESPONSE>>>>>>>',response);
          checkArrLength(remaining);
        }
      });
    }
    checkArrLength(recipients)
  });
}

function getAllRecipients(callback) {
  var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/customer");
  firebaseRef.once('value', function(snapshot) {
    var data = snapshot.val();
    var userIds = Object.keys(data);
    var customerPhoneNumbers = userIds.map(function(customerId){
      return data[customerId]['phoneNumber'];
    });
    userIds.length === customerPhoneNumbers.length ? callback(customerPhoneNumbers) : console.log('userId length not the same as customerPhoneNumbers length');
  })
}
