const express = require("express");
const cors = require("cors");
const { options } = require("./access-origin/index.js");
const { routerApi } = require("./routes/index.js");
const { errorAuthHandler } = require("./middlewares/errorAuthHandler.js");
const { errorHandler } = require("./middlewares/errorhandle.js");
require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json());
app.use(cors(options));

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
