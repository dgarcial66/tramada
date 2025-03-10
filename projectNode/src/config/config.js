require("dotenv/config");

const config = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPortMdb: process.env.DB_PORT_MARIADB,
  secretAccess: process.env.ACCESS_TOKEN,
  secretRefresh: process.env.REFRESH_TOKEN,
};

module.exports = { config };
