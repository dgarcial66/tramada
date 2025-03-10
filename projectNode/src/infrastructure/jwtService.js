const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");

function accessToken(payload) {
  delete payload.password;
  const obj = {
    sub: payload.id,
    email: payload.email,
    iat: Math.floor(Date.now() / 1000),
  };
  console.log("SOY OBJ: ", obj);
  const token = jwt.sign(obj, config.secretAccess, { expiresIn: "1h" });
  console.log("SOY TOKEN ACCESS: ", token);
  return token;
}

function refreshToken(payload) {
  delete payload.password;
  const obj = {
    sub: payload.id,
    email: payload.email,
    iat: Math.floor(Date.now() / 1000),
  };
  console.log("SOY OBJ: ", obj);
  const token = jwt.sign(obj, config.secretRefresh, { expiresIn: "7d" });
  console.log("SOY TOKEN REFRESH: ", token);
  return token;
}

module.exports = { accessToken, refreshToken };
