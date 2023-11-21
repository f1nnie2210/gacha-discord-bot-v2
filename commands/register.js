const {
  checkUserAndIcExists,
  registerNewUser,
} = require("../database/queries");

const icRegex = /^[a-zA-Z]+_[a-zA-Z]+(?:_[a-zA-Z]+)*$/;

const registerUser = (message, ic) => {
  const username = message.author.username;
  const userId = message.author.id;

  // Kiểm tra xem người dùng đã đăng ký tài khoản chưa
  checkUserAndIcExists(userId, null, (err, { userExists }) => {
    if (err) {
      console.error(err);
      message.reply("Đã có lỗi xảy ra khi kiểm tra thông tin đăng ký.");
      return;
    }

    if (userExists) {
      message.reply("Bạn đã đăng ký tài khoản gacha rồi.");
      return;
    }

    // Nếu người dùng đã đăng ký tài khoản, tiếp tục kiểm tra IC
    if (ic) {
      if (!icRegex.test(ic)) {
        message.reply("Bạn phải cung cấp một IC hợp lệ. Ví dụ: Finn_Frederick");
        return;
      }

      // Kiểm tra xem IC đã tồn tại chưa
      checkUserAndIcExists(null, ic, (err, { icExists }) => {
        if (err) {
          console.error(err);
          message.reply("Đã có lỗi xảy ra khi kiểm tra thông tin đăng ký.");
          return;
        }

        if (icExists) {
          message.reply("IC này đã được sử dụng. Vui lòng chọn một IC khác.");
          return;
        }

        // Nếu tài khoản và IC đều hợp lệ, thực hiện đăng ký
        const userData = { user_id: userId, username: username, ic: ic };
        registerNewUser(userData, (err, results) => {
          if (err) {
            console.error(err);
            message.reply("Đã có lỗi xảy ra khi đăng ký tài khoản.");
            return;
          }

          if (results.affectedRows > 0) {
            message.reply(
              "Bạn đã đăng ký tài khoản gacha thành công! Hãy sử dụng $roll để bắt đầu gacha."
            );
          }
        });
      });
    } else {
      // Nếu người dùng không nhập IC, thông báo họ cần nhập một IC hợp lệ
      message.reply("Bạn phải cung cấp một IC hợp lệ. Ví dụ: Finn_Frederick");
    }
  });
};

module.exports = registerUser;
