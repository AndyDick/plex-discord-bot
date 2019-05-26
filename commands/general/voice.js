var conn;
var voiceChannel;
var commands = {
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
  }
}
module.exports = commands;
