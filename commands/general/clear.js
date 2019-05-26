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
        if (!amount) {
          amount = 50;
          message.reply(`No number of messages specified, removing last ${amount}`);
        }
        amount++;
        let bool = false;
        if (!Member.id === server.ownerID) {
            if (amount >= 400) return errorChannel.send(`:x: You can\'t clear more than 400 messages! ${Member}`);
       } else {
           bool = true;
       }
       let maxAmount;
       message.channel.send(`Clearing this channel of ${amount-1} messages.`);
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
}
module.exports = commands;
