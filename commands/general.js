// plex api module -----------------------------------------------------------
var PlexAPI = require('plex-api');

// configs ---------------------------------------------------------------
var plexConfig = require('../config/plex');
var botConfig = require('../config/bot');
var prefix = botConfig.prefix;

// command lists -------------------------------------------------------------
var plexCommands = require('../commands/plex');
var genCommands = require('../commands/general');

// gen commands -------------------------------------------------------------
var commands = {
  'clear' : {
    usage: '<num messages>',
    description: 'deletes last messages',
    process: function(client, message) {
      try {
        const args = message.content.slice(prefix.length).split(' ');
        console.log('cleared messages');
        let Member = message.member;
        let server = message.guild;
        let Channel = message.channel;
        if (!Member.hasPermission("ADMINISTRATOR")) return; // Does nothing if the author does not have administrator permission.
        let amount = parseInt(args[1],10); // amount = a number entered.
        // console.log("amount ",amount);
        // if (!amount) return errors.missArgs(Member, errorChannel, "r!clear 1-200 \`(number)\`"); // If amount is missing, then it raises an error.
        let bool = false;
        if (!Member.id === server.ownerID) { // Bypass for the server owner.
            if (amount >= 400) return errorChannel.send(`:x: You can\'t clear more than 400 messages! ${Member}`); // If amount is over 200 then it raises an error.
       } else {
           bool = true;
       }
       let maxAmount;
       if (amount > 49) maxAmount = 50;
       else maxAmount = amount;
       for (Channel.bulkDelete(maxAmount + 1, bool); amount >= 0; amount -= 50) {
           if (amount > 49) maxAmount = 50;
           else if (amount > 0) maxAmount = amount;
           else break;
           Channel.bulkDelete(maxAmount, bool);
       }
     }
     catch (e) {
      console.log("error when clearing messages"+e);
     }
    }
  },
  'ping' : {
    usage: '',
    description: 'pingpong',
    process: function(client, message) {
      console.log(`${message.author.username} pinged ${message.guild.name} in ${message.channel.name}`);
      message.reply('*pong.*');
    }
  },
  'post' : {
    usage: '',
    description: 'clear',
    process: function(client, message) {
      // console.log(`automatically cleared music`);
       message.channel.bulkDelete(10, true);
    }
  },
};

module.exports = commands;
