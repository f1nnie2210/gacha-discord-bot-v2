const {
  checkChannelExists,
  addAllowedChannel,
} = require("../database/queries");

const handleAddChannel = (channelId, message) => {
  checkChannelExists(channelId, (err, results) => {
    if (err) {
      console.error(err);
      message.channel.send("Đã có lỗi xảy ra khi kiểm tra kênh.");
      return;
    }
    if (results.length > 0) {
      message.channel.send(
        `Kênh <#${channelId}> đã được thêm vào danh sách cho phép trước đó.`
      );
      return;
    }
    addAllowedChannel(channelId, (err, results) => {
      if (err) {
        console.error(err);
        message.channel.send("Đã có lỗi xảy ra khi thêm kênh.");
        return;
      }
      if (results.affectedRows > 0) {
        message.channel.send(
          `Đã thêm kênh <#${channelId}> vào danh sách được phép.`
        );
      }
    });
  });
};

const handleSetting = (args, message) => {
  if (args.length === 0) {
    message.channel.send(
      "Bạn cần phải cung cấp một subcommand. Ví dụ: `$setting addchannel #channel-name`."
    );
    return;
  }

  const subCommand = args[0];
  switch (subCommand) {
    case "addchannel":
      if (!args[1]) {
        message.channel.send(
          "Bạn cần phải cung cấp ID của kênh. Ví dụ: `$setting addchannel #channel-name`."
        );
        return;
      }
      const channelId = args[1].replace(/<#|>/g, "");
      handleAddChannel(channelId, message);
      break;
    // other subcommands
    default:
      message.channel.send("Subcommand không hợp lệ.");
      break;
  }
};

module.exports = handleSetting;
