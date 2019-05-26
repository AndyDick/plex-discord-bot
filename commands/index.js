var plexConfig = require('../config/plex');
var botConfig = require('../config/bot');
global.prefix = botConfig.prefix;
global.volume = 0.2;

//plex stuff
global.plexCommands = require('./plex');

// general stuff
global.ping = require('./general/ping');
global.shutdown = require('./general/shutdown');
global.voice = require('./general/voice');
global.clear = require('./general/clear');

//custom
global.url = require('./custom/url');
global.all_commands = [
  plexCommands,
  ping,
  shutdown,
  voice,
  clear,
  url,
];
