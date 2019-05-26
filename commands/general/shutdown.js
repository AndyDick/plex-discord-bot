var commands = {
  'shutdown' : {
    usage: '',
    description: 'kill the bot',
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
  'sd' : {
    usage: '',
    description: 'kill the bot',
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
  }
}
module.exports = commands;
