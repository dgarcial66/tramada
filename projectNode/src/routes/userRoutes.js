const express = require("express");
const { UserService } = require("../service/userService.js");

const userRoutes = express.Router();
const service = new UserService();

userRoutes.use(express.json());

userRoutes.get("/", async (req, res) => {
  const user = await service.getUser();
  console.log("ENTOR: user");
  res.json(user);
});

userRoutes.post("/", async (req, res) => {
  try {
    let body = req.body;
    const result = await service.create(body);
    res.json({ affecteRows: result, data: body });
  } catch (e) {
    res.status(409).json({ affectedRows: 0, message: e.message });
  }
});

module.exports = { userRoutes };
