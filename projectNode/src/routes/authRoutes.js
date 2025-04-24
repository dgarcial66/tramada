const express = require("express");
const { UserService } = require("../service/userService.js");
const { verifyTokenAccess } = require("../middlewares/verifyToken");
const {
  accessToken,
  refreshToken,
} = require("../infrastructure/jwtService.js");

const authRouter = express.Router();
const service = new UserService();



authRouter.get("/verify", verifyTokenAccess, async (req, res, next) => {
  const isEmail = req.user && req.user.email;
  try {
    if (!isEmail)
      return res.status(401).json({ message: "Por favor inicie una sesión" });
    console.log("QUE TENEMOS EN REQ.USER: ", req.user);
    const user = await service.getUserName(req.user.email);
    if (!user) {
      console.log("AQUI ENTRO PORQUE USER NO EXISTE");
      return res.status(401).json({ message: "Usuario no existe..." });
    }
    console.log("AQUI ENTRO PORQUE USER EXISTE");
    const infoUser = req.user;
    console.log("EL USER INFO ES: ", infoUser);
    return res.status(200).json(infoUser);
  } catch (error) {
    console.log("AQUI ERROR EN RUTAS DE AUTH VERIFY");
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    console.log("AQUI VAMOS SI USER ESTA EN REQ: ", req.body);
    const { email, password } = req.body;
    const user = await service.findForAuth(email, password);
    console.log("AQUI TENEMOS LA INFO DEL USUARIO: ", user[0]);
    if (!user) {
      return res.status(401).json({ message: "Usuario no existe..." });
    }
    delete user[0].password;
    const generateAccessToken = accessToken(user[0]);
    res.header("Authorization", "Bearer " + generateAccessToken);
    const generateRefreshToken = refreshToken(user[0]);
    res.cookie("refreshToken", generateRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
      path: "/",
    });

    req.user = user;
    const userInfo = req.user;
    console.log(userInfo);
    console.log("INFO USER: ", userInfo);
D
    return res.status(200).json(userInfo[0]);



  } catch (error) {
    console.log("AQUI ERROR EN RUTAS DE AUTH LOGIN");
    console.log(error);
  }
});

authRouter.post("/logout", (req, res) => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Sesión cerrada" });
  } catch (error) {
    console.log("Error al cerrar sesion...", error);
  }
});

module.exports = { authRouter };
