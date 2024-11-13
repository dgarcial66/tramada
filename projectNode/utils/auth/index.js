const passport = require("passport");
const { localStrategy } = require("./strategies/localStrategy.js");

passport.use(localStrategy);
