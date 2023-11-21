const db = require("./connection");

const checkChannelExists = (channelId, callback) => {
  const query = "SELECT * FROM allowed_channels WHERE channel_id = ?";
  db.query(query, [channelId], callback);
};

const addAllowedChannel = (channelId, callback) => {
  const query =
    "INSERT INTO allowed_channels (channel_id, created_at) VALUES (?, NOW())";
  db.query(query, [channelId], callback);
};

const checkUserAndIcExists = (userId, ic, callback) => {
  const query = `
      SELECT 
      (SELECT COUNT(*) FROM users WHERE user_id = ?) AS userExists,
      (SELECT COUNT(*) FROM users WHERE LOWER(ic) = LOWER(?)) AS icExists;
  `;
  db.query(query, [userId, ic], (error, results) => {
    if (error) {
      return callback(error);
    }
    const userExists = results[0].userExists > 0;
    const icExists = results[0].icExists > 0;
    return callback(null, { userExists, icExists });
  });
};

const registerNewUser = (userData, callback) => {
  const query =
    "INSERT INTO users (user_id, username, ic, points, created_at) VALUES (?, ?, ?, 0, NOW())";
  db.query(query, [userData.user_id, userData.username, userData.ic], callback);
};

module.exports = {
  checkChannelExists,
  addAllowedChannel,
  checkUserAndIcExists,
  registerNewUser,
};
