const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const prefix = "$";
const config = require("./config/config.json");
const handleMessage = require("./events/message");
const db = require("./database/connection");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Using message.js for handle 'message'
client.on("message", handleMessage);

client.login(config.BOT_TOKEN);
