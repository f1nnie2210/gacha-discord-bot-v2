const handleSetting = require("../commands/setting");
const sendHelpMessage = require("../commands/help");
const registerUser = require("../commands/register");
const prefix = "$";

module.exports = (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  switch (command) {
    case "setting":
      handleSetting(args, message);
      break;
    case "help":
      sendHelpMessage(message);
      break;
    case "register":
      registerUser(message, args[0]);
      break;
    // case 'anotherCommand':
    //   handleAnotherCommand(args, message);
    //   break;
    default:
      message.channel.send(
        "Không rõ lệnh. Vui lòng sử dụng `$help` để xem danh sách lệnh."
      );
      break;
  }
};
