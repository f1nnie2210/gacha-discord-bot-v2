const Discord = require("discord.js");

// Server infomation
const serverInfo = {
  name: "Red County Roleplay",
  ipAddress: "rcrp.vn",
  website: "ucp.rcrp.vn",
  logoUrl:
    "https://lh3.googleusercontent.com/u/0/drive-viewer/AK7aPaAsN7MM1i8ug5BPCNAG9rxBkii_ryg6AxlTZGKN5HOONNIK2QEzKowqgt2QWE8iwJcVLPMz-p2idqPGZfJoeaQZuOGP4w=w1920-h923",
  instructions: "...",
};

function sendHelpMessage(message) {
  const helpEmbed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(serverInfo.name)
    .setDescription(serverInfo.instructions)
    .addField("IP Server", serverInfo.ipAddress, true)
    .addField("Website", serverInfo.website, true)
    .setThumbnail(serverInfo.logoUrl)
    .setTimestamp()
    .setFooter("Thông tin server", serverInfo.logoUrl);

  message.channel.send(helpEmbed);
}

module.exports = sendHelpMessage;
