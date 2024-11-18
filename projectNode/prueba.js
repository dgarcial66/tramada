const bcrypt = require("bcryptjs");

async function hashers() {
  const hash = await bcrypt.hash("hashed_password", 10);
  console.log(hash);
}
hashers();
