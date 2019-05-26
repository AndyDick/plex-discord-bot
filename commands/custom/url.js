var commands = {
  'playurl' : {
    usage: '<url>',
    description: 'play a url - needs to be a link to an audio file',
    process: function(client, message, query) {
      voiceChannel = message.member.voiceChannel;
      if (voiceChannel) {
        voiceChannel.join().then(function(connection) {
          conn = connection;
        // url = 'https://www.bensound.com/royalty-free-music?download=ukulele';
        var url = query;
        // çonsole.log(`attempting to play arb url`);
        message.reply(`trying to play ${url}`);
        dispatcher = connection.playArbitraryInput(url).on('end', () => {
          message.reply(`finished playing ${url}`);
          conn.disconnect();
          voiceChannel.leave();
        });
        dispatcher.setVolume(volume);
        });
      }
    }
  }
}
module.exports = commands;
