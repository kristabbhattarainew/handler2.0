const Discord = require('discord.js');

module.exports = {
  name: "ping",
  aliases: ["pong"],
  run: async (client, message, args ) => {

    let start = Date.now();

    let embed1 = new Discord.MessageEmbed()
     .setDescription("Pinging 🏓")
      .setColor("RED");

    message.channel.send({embeds : [ embed1 ]}).then(m => {
      let end = Date.now();
      
      let embed = new Discord.MessageEmbed()
      .setAuthor("Ping!")
      .addField("API LATENCY", Math.round(client.ws.ping) + "ms", true)
      .addField("MESSAGE LATENCY", end - start + "ms", true)
      .setColor("GREEN");

      m.edit({ embeds: [embed]}).catch(e => message.channel.send(e))
    })
  }
};