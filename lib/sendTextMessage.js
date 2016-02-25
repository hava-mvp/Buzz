var env = require('env2')//('.env');
var messagebird = require('messagebird')(process.env.messagebird);
var Firebase = require('firebase');

var sendTextMessage = module.exports.sendTextMessage = function(offer, endTime, barName, callback) {
  console.log('offer', offer, 'endTime', endTime, 'barName', barName);
  getAllRecipients(function(recipients) {
    var totalNumberOfBatches;
    var numberOfAlertAttempts = 0;
    var messageSentStatus = [];
    var offerClean = offer.match(/%20/g) ? decodeURIComponent(offer) : offer;
    var endTimeClean = endTime.replace(/%3A/g, ":").replace(/%20/g, "");

    function checkArrLength (arr) {
      totalNumberOfBatches = Math.ceil(arr.length/50);
      var i,j,batchesOf50;
      for (i=0,j=arr.length; i<j; i+=50) {
        batchesOf50 = arr.slice(i,i+50);
        sendOfferAlert(batchesOf50);
      }
    }

    function sendOfferAlert (batchOf50) {
      console.log('>>>>>>>>>>>>>', batchOf50.length);
      var params = {
        'originator': 'Hava',
        'recipients': batchOf50,
        'body': `Hello! ${barName} has a new offer!!
Offer: ${offerClean}.
Offer ends at ${endTimeClean}.
Click the link below to get your code.
http://hava-mvp.herokuapp.com/#live-offers`
      };

      messagebird.messages.create(params, function (err, response) {
        numberOfAlertAttempts++;
        if (err) {
          console.log('MESSAGE BIRD ERR>>>>>>',err);
          haveAllTextsBeenSent('notOk');
        } else {
          console.log('MESSAGE BIRD RESPONSE>>>>>>>',response);
          haveAllTextsBeenSent('ok');
        }
      });
    }

    function haveAllTextsBeenSent(response){
      messageSentStatus.push(response);
      numberOfAlertAttempts === totalNumberOfBatches ? callback(messageSentStatus.toString()) : console.log('waiting on messages to be sent');
    }

    checkArrLength(recipients);

  });
}

function getAllRecipients(callback) {
  console.log('getting back all recipients');
  var firebaseRef = new Firebase("https://hava-peter.firebaseio.com/customer");
  firebaseRef.once('value', function(snapshot) {
    var data = snapshot.val();
    var userIds = Object.keys(data);
    var customerPhoneNumbers = userIds.map(function(customerId){
      return data[customerId]['phoneNumber'];
    });
    (userIds.length === customerPhoneNumbers.length) ? callback(customerPhoneNumbers) : console.log('userId length not the same as customerPhoneNumbers length');
  })
}
