const atob = require("atob");

const getIdFromToken = (token) => {
  var base64Url = token.split(" ")[1].split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const payload = JSON.parse(jsonPayload);
  // return payload.sub;
  return payload.sub;
};

module.exports = getIdFromToken;
