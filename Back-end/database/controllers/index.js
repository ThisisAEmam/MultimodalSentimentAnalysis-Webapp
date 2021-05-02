const usersLoginRegister = require("./users/loginRegister");
const usersCurrent = require("./users/currentUser");
const usersPassword = require("./users/password");

module.exports = {
  ...usersLoginRegister,
  ...usersCurrent,
  ...usersPassword,
};
