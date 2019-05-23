module.exports = function(client) {
  // plex commands -------------------------------------------------------------
  var plexCommands = require('../commands/plex');
  var genCommands = require('../commands/general');
  var botConfig = require('../config/bot');
  var prefix = botConfig.prefix;

  // when bot is ready
  client.on('ready', function() {
    console.log('bot ready');
    console.log('logged in as: ' + client.user.tag);

    plexCommands['plexTest'].process();
  });

  // when message is sent to discord
  client.on('message', function(message){
    var msg = message.content.toLowerCase();
    if (msg.startsWith(prefix)){
      var cmdTxt = msg.split(" ")[0].substring("-".length, msg.length);
      var query = msg.substring(msg.indexOf(' ')+1);
      var pcmd = plexCommands[cmdTxt];
      var gcmd = genCommands[cmdTxt];
      if (pcmd){
        try {
          console.log('plex command');
          pcmd.process(client, message, query);
        }
        catch (e) {
          console.log(e);
        }
      }
      else if(gcmd){
        try {
          console.log('general command');
          gcmd.process(client, message, query);
        }
        catch (e) {
          console.log(e);
        }
      }
      else {
        message.reply('**Sorry, that\'s not a command.**');
      }

    }
  });
};
