const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const pool = require("./database");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

// app.js will pass the global passport object here, and this function will configure it
module.exports = (passport) => {
  // The JWT payload is passed into the verify callback
  passport.use(
    "admin",
    new JwtStrategy(options, function (jwt_payload, done) {
      // We will assign the `sub` property on the JWT to the database ID of user
      pool
        .connect()
        .then((client) => {
          client
            .query("SELECT * FROM users WHERE user_id = $1 AND admin = TRUE;", [jwt_payload.sub])
            .then((user) => {
              if (user.rowCount === 0) return done(null, false);
              const returnedUser = user.rows[0];
              return done(null, returnedUser);
            })
            .catch((err) => done(err, false));
        })
        .catch((err) => console.log(`Pool error: ${err}`));
    })
  );

  passport.use(
    "user",
    new JwtStrategy(options, function (jwt_payload, done) {
      // We will assign the `sub` property on the JWT to the database ID of user
      pool
        .connect()
        .then((client) => {
          client
            .query("SELECT * FROM users WHERE user_id = $1", [jwt_payload.sub])
            .then((user) => {
              if (user.rowCount === 0) return done(null, false);
              const returnedUser = user.rows[0];
              return done(null, returnedUser);
            })
            .catch((err) => done(err, false));
        })
        .catch((err) => console.log(`Pool error: ${err}`));
    })
  );
};
