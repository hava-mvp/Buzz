var sendTextMessage = require('./sendTextMessage.js')

exports.register = function(server, options, next) {

server.route([
  {
    method: 'GET',
    path: '/{param*}',
    config: {
      description: 'return the app',

      handler: {
        directory: {
          path: 'public',
          listing: true
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/sendTextMessage',
    config: {
      description: 'send a text message on buzzß',

      handler: function(request, reply) {
        var offer   = request.payload.offer;
        var endTime = request.payload.endTime;
        var barName = request.payload.barName;
        console.log('PAYLOAD INFO', offer, endTimem, barName);
        sendTextMessage(offer, endTime, barName, function(response){
          reply('Data received!');
        });
      }
    }
  }
]);

  return next();
};

exports.register.attributes = {
  name: 'Home'
};
