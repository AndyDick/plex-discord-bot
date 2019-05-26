module.exports = function(client) {
  // plex commands -------------------------------------------------------------
  var plexCommands = require('../commands/plex');
  // var genCommands = require('../commands/general');
  // var ping = require('../commands/ping');
  var allcommands = require('../commands');
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
      var arrcmd = findCommand(message, client, cmdTxt, query);



    }
  });
};

var findCommand = function (message, client, cmdTxt, query){
  var found;
  for (var command in all_commands) {
    var arrcmd = all_commands[command][cmdTxt];
    // console.log(`comparing ${command}`);
    if(arrcmd){
      try {
        found = true;
        arrcmd.process(client, message, query);
        break;
      }
      catch (e) {
        console.log(e);
      }
    }
  }
  // if(!found){
  // }
  // else {
  //   message.reply('**Sorry, that\'s not a command.**');
  // }
};
