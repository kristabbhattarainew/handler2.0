const { Client, Collection, Intents } = require("discord.js");

const client = new Client({ intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ] });
const { config } = require('dotenv')
const { prefix , TOKEN } = require("./config.json");
const { topggauth } = require("./topgg-config.json");
const ms = require("ms");
const http = require("http");
const fetch = require("node-fetch");
const Discord = require("discord.js");
const fs = require("fs");
const bodyParser = require("body-parser");
const ascii = require('ascii-table');
const db = require("quick.db");
const Topgg = require('@top-gg/sdk');
const express = require("express");

const app = express();

const webhook = new Topgg.Webhook("profileit");

//--------Message-------
client.on("messageCreate", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  if (!message.content.startsWith(prefix)) return;

  // If message.member is uncached, cache it.
  if (!message.member)
    message.member = await message.guild.fetchMember(message);

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  // Get the command
  let command = client.commands.get(cmd);
  // If none is found, try to find it by alias
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;
  if (command) command.run(client, message, args);
  
});

client.on("ready", async () => {
  client.user.setActivity(`Making Yt vids`);
  
  console.log(`${client.user.tag} is online in ${client.guilds.cache.size} Guild`);
  
});
//--------------------------------------------------- F U N C T I O N S --------------------------------------------

function send(content, message, color) {
  if (!color) color = "GREEN";

  return message.channel.send({
    embed: { description: content, color: color }
  });
}
//----Handler------
client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

//--------MESSAGE EVENT--------

// client.on("messageCreate", message => {

  // if (message.author.bot) return;
  // if (!message.guild) return;
  
// });

//--------MESSAGE EVENT--------

app.post('/vote', webhook.middleware(), (req, res) => {

  console.log(`${req.vote.user}, Voted the Profile It!!`) 
  
  
  db.add(`votes_${req.vote.user}`, 1)
  let votescount = db.get(`votes_${req.vote.user}`);
 
  
  const votingchannel = bot.channels.cache.get(`877207307656769576`);
  if(!votingchannel) return console.log("Can't find the channel!")
  
  
  
const embed = new Discord.MessageEmbed()
  .setDescription(`<@!${req.vote.user}>, **Thanks for voting Profile It.
  
  Thanks for your great support!!
  
  <@!${req.vote.user}> Total Votes: ${votescount}**
  
[Click here to vote Profile It!!](https://top.gg/bot/716257964767445043/vote)
  `)
  .setTimestamp()
  .setColor(`BLUE`);
  
  votingchannel.send({ embeds: [ embed ]})
  
  res.sendStatus(5500)
  
})


client.login(TOKEN);
app.listen(3000);