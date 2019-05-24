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
       message.reply(`Clearing this channel of ${amount} messages.`);
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
  'ping' : {
    usage: '',
    description: 'pingpong',
    process: function(client, message) {
      console.log(`${message.author.username} pinged ${message.guild.name} in ${message.channel.name}`);
      console.log(`ping of ${client.ping}`);
      message.reply('*pong.*');
      setTimeout(function(){
        message.channel.bulkDelete(50, true);
      }, 2000);
      console.log(`cleared`);
    }
  },
  'leave' : {
    usage: '',
    description: 'make bot leave the voice channel',
    process: function(client, message) {
      // if song request exists
      // if (query.length > 0) {
      //   plexOffset = 0; // reset paging
      //   plexQuery = null; // reset query for !nextpage
      //
      //   findArtist(query, plexOffset, plexPageSize, message);
      //   console.log(`${message.author.username} requested artist ${query} be played on ${message.guild.name} in ${message.channel.name}`);
      // }
      // else {
      //   message.reply('**Please enter a song title**');
      // }
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
        console.log(`${message.author.username} actually did shut this shit down`);
        // message.channel.bulkDelete(10, true);
        message.reply('Shutting the bot down in 5s.');
        setTimeout(function(){
          message.reply('Shutting the bot down in 4s.');
        }, 1000);
        setTimeout(function(){
          message.reply('Shutting the bot down in 3s.');
        }, 2000);
        setTimeout(function(){
          message.reply('Shutting the bot down in 2s.');
        }, 3000);
        setTimeout(function(){
          message.reply('Shutting the bot down in 1s.');
        }, 4000);
        setTimeout(function(){
          message.reply('Shutting the bot down in 0s.');
          message.channel.bulkDelete(10, true);
        }, 5000);
        setTimeout(function(){
          client.destroy();
        }, 6000);
      }
    }
  },
};

module.exports = commands;
