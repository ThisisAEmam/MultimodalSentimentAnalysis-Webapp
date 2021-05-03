const usersLoginRegister = require("./users/loginRegister");
const usersCurrent = require("./users/currentUser");
const usersPassword = require("./users/password");
const dashboardFAQ = require("./dashboard/faq");
const dashboardNewsletter = require("./dashboard/newsletter");

module.exports = {
  ...usersLoginRegister,
  ...usersCurrent,
  ...usersPassword,
  ...dashboardFAQ,
  ...dashboardNewsletter,
};
