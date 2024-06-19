module.exports = (sequelize, Sequelize) => {
    const CoinPrice = sequelize.define("coin_price", {
        coin: Sequelize.DataTypes.STRING,
        base_price: Sequelize.DataTypes.STRING,
        coin_price: Sequelize.DataTypes.STRING,
        api_coin_price: Sequelize.DataTypes.STRING,
        createdAt: {
            field: 'created_at',
            type: "TIMESTAMP"
        },
        updatedAt: {
            field: 'updated_at',
            type: "TIMESTAMP"
        }
    });
    return CoinPrice;
  };