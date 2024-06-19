require('dotenv').config();

const configs = {
  HOST: process.env.HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  SECRET:process.env.TOKEN_KEY,
  tokenExpiryTime: "2h",
};

module.exports = configs;