const dbConfig = require("../config/config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    logging: false
});
 

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.UserModel = require("./UserModel")(sequelize, Sequelize);
db.PasswordReset = require("./PasswordReset")(sequelize, Sequelize);
db.Transaction = require("./Transaction")(sequelize, Sequelize);
db.CoinPriceModel = require("./CoinPriceModel")(sequelize, Sequelize);
 
module.exports = db;