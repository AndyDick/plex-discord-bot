
  var commands = {
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
    }
  }

module.exports = commands;
