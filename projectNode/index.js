const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("HOLA MUNDO...");
});

app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});
