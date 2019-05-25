// plex api module -----------------------------------------------------------
// var PlexAPI = require('plex-api');

// configs ---------------------------------------------------------------
var plexConfig = require('../config/plex');
var botConfig = require('../config/bot');
var prefix = botConfig.prefix;

// command lists -------------------------------------------------------------
// var plexCommands = require('../commands/plex');
// var genCommands = require('../commands/general');
// var ping = require('../commands/ping');


var conn = null;
var voiceChannel = null;
// gen commands -------------------------------------------------------------
var commands = {
  'clear' : {
    usage: '<number of messages>',
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
        amount++;
        // console.log("amount ",amount);
        // if (!amount) return errors.missArgs(Member, errorChannel, "r!clear 1-200 \`(number)\`"); // If amount is missing, then it raises an error.
        let bool = false;
        if (!Member.id === server.ownerID) { // Bypass for the server owner.
            if (amount >= 400) return errorChannel.send(`:x: You can\'t clear more than 400 messages! ${Member}`); // If amount is over 200 then it raises an error.
       } else {
           bool = true;
       }
       let maxAmount;
       message.reply(`Clearing this channel of ${amount-1} messages.`);
       if (amount > 49) maxAmount = 50;
       else maxAmount = amount;
       setTimeout(function(){
         for (Channel.bulkDelete(maxAmount + 1, bool); amount >= 0; amount -= 50) {
             if (amount > 49) maxAmount = 50;
             else if (amount > 0) maxAmount = amount;
             else break;
             Channel.bulkDelete(maxAmount, bool);
         }
       }, 2000);
     }
     catch (e) {
      console.log("error when clearing messages"+e);
     }
    }
  },
  'leave' : {
    usage: '',
    description: 'make bot leave the voice channel',
    process: function(client, message) {
      voiceChannel = message.member.voiceChannel;
      if (voiceChannel) {
        voiceChannel.join().then(function(connection) {
          conn = connection;
        });
      }
      if (conn) {
        conn.disconnect();
      }
      else if(voiceChannel){
        voiceChannel.leave();
      }
      else{
        message.reply(`the bot can't leave.`);
      }
    }
  },
  'join' : {
    usage: '',
    description: 'make bot join the voice channel',
    process: function(client, message) {
      voiceChannel = message.member.voiceChannel;
      if (voiceChannel) {
        voiceChannel.join().then(function(connection) {
          conn = connection;
        });
      }else{
        message.reply(`please join a voice channel first.`);
      }
    }
  },
  'shutdown' : {
    usage: '',
    description: 'make bot leave the voice channel',
    process: function(client, message) {
      let Member = message.member;
      if (!Member.hasPermission("ADMINISTRATOR")) {
        console.log(`${message.author.username} attempted to shut this shit down`);
        message.channel.bulkDelete(10, true);
        message.reply('You need to be a server Administrator to shut the bot down from here.');
        return;
      }
      else{
        console.log(`${message.author.username} actually did shut this shit down.`);
        message.channel.send('Shutting the bot down in 5s.');
        setTimeout(function(){
          message.channel.send('Shutting the bot down in 1s.');
          message.channel.bulkDelete(3, true);
        }, 4000);
        setTimeout(function(){
          client.destroy();
        }, 5000);
      }
    }
  },
};

module.exports = commands;
