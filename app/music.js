module.exports = function(client) {
  // plex commands -------------------------------------------------------------
  // var plexCommands = require('../commands/plex');
  // var genCommands = require('../commands/general');
  // var ping = require('../commands/ping');
  var allcommands = require('../commands');
  console.log(`commands: ${allcommands.size}`)
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
      var pcm = ping[cmdTxt];
      if (pcmd){
        try {
          pcmd.process(client, message, query);
        }
        catch (e) {
          console.log(e);
        }
      }
      else if(gcmd){
        try {
          gcmd.process(client, message, query);
        }
        catch (e) {
          console.log(e);
        }
      }else if(pcm){
        try {
          pcm.process(client, message, query);
        }
        catch (e) {
          console.log(e);
        }
      }
      // else if(true)
      // {
      //   // [cmdTxt].process();
      //   try {
      //     cmdTxt.process(client, message, query);
      //   }
      //   catch (e) {
      //     console.log(e);
      //   }
      // }
      else {
        message.reply('**Sorry, that\'s not a command.**');
      }

    }
  });
};
