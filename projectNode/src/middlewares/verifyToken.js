const { UserService } = require("../service/userService.js");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config.js");
const {
  accessToken,
  refreshToken,
} = require("../infrastructure/jwtService.js");

const service = new UserService();

async function verifyTokenAccess(req, res, next) {
  try {
    const authHeaders = req.headers["authorization"];
    console.log(authHeaders);
    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) return verifyTokenRefresh(req, res, next);
    const payload = jwt.verify(token, config.secretAccess);
    req.user = payload;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return verifyTokenRefresh(req, res, next);
    }
    console.log("Este error en jwtStrategy: ", error);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

function verifyTokenRefresh(req, res, next) {
  const refreshToken = req.cookies?.refreshToken;
  console.log("SOY TOKEN 111: ", refreshToken);
  console.log("QUE SOY YO USER: ", refreshToken);
  if (!refreshToken)
    return res.status(404).json({ error: "State the token null" });

  console.log("SOY CLAVE DE EL JWT ACCESS: ", config.secretAccess);
  console.log("SOY CLAVE DE EL JWT REFRESH: ", config.secretRefresh);
  try {
    const user = jwt.verify(refreshToken, config.secretRefresh);
    console.log("SOY USER VERIFICADO EN VERIFY TOKEN: ", user);
    const newAccessToken = {
      sub: user.sub,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
    };
    console.log("AQUI VAMOS CON PAYLOAD DE VERIFY: ", newAccessToken);
    const tokenAccess = jwt.sign(newAccessToken, config.secretAccess, {
      expiresIn: "1h",
    });
    console.log("AQUI VEMOS EL ACCESS TOKEN NUEVO: ", tokenAccess);

    res.header("Authorization", "Bearer " + tokenAccess);
    req.user = newAccessToken;
    console.log("AQUI VEMOS LO QUE GUARDAMOS EN EL REQ.USER: ", req.user);
    return next();
  } catch (error) {
    console.log("Error en verificacion de refresco: ", error);
    return res
      .status(403)
      .json({ message: "Refresh token inválido o expirado" });
  }
}

module.exports = { verifyTokenAccess };
