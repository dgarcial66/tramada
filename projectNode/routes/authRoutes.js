const express = require("express");
const passport = require("passport");

const authRouter = express.Router();

authRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      console.log("SOY REQ USER: ", req.user);
      res.json(req.user);
    } catch (err) {
      console.log("Este error en authRouter: ", err);
    }
  }
);

module.exports = { authRouter };
