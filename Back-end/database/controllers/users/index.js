const usersLoginRegister = require("./loginRegister");
const usersCurrent = require("./currentUser");
const usersPassword = require("./password");

module.exports = {
  ...usersLoginRegister,
  ...usersCurrent,
  ...usersPassword,
};
