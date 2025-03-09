const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { options } = require("./src/access-origin/index.js");
const { routerApi } = require("./src/routes/index.js");
const { errorAuthHandler } = require("./src/middlewares/errorAuthHandler.js");
const { errorHandler } = require("./src/middlewares/errorhandle.js");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json());
app.use(cors(options));
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("SOY ENTORNO", process.env.DB_USER);
  console.log("SOY ORIGIN", req.header("origin"));
  res.send("HOLA MUNDO...");
});

routerApi(app);
app.use(errorAuthHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});
