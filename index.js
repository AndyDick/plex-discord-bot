// packages --------------------------------------------------------------------
const Discord = require('discord.js');

// my keys ---------------------------------------------------------------------
var keys = require('./config/keys.js');

// discord client --------------------------------------------------------------
const client = new Discord.Client();

// bot functions ---------------------------------------------------------------
require('./app/bot.js')(client);

client.login(keys.botToken);
