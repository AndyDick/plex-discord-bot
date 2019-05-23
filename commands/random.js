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
  'ping' : {
    usage: '',
    description: 'pingpong',
    process: function(client, message) {
      console.log(`${message.author.username} pinged ${message.guild.name} in ${message.channel.name}`);
      message.reply('*pong.*');
    }
  },
};

module.exports = commands;
