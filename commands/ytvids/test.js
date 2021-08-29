const Discord = require('discord.js');

module.exports = {
  name: "test",
   aliases: ["t"],
  run: async (client, message, args ) => {
      //--------------------------------------S T A R T---------------------------------------

        message.channel.send("Test")

       //---------------------------------------E N D----------------------------------------
    }
  };