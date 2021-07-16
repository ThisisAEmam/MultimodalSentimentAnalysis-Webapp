const usersLoginRegister = require("./loginRegister");
const usersCurrent = require("./currentUser");
const usersPassword = require("./password");
const users = require("./user");

module.exports = {
  ...usersLoginRegister,
  ...usersCurrent,
  ...usersPassword,
  ...users,
};
