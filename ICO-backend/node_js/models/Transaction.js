module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        user_id: {
            type: Sequelize.DataTypes.INTEGER
        },
        tokens: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        coin: Sequelize.DataTypes.STRING,
        blockchain: Sequelize.DataTypes.STRING,
        amount: Sequelize.DataTypes.STRING,
        transaction_hash: Sequelize.DataTypes.STRING,
        from_address: Sequelize.DataTypes.STRING,
        status: {
            type: Sequelize.ENUM("pending", "successful","fail"),
        },
        createdAt: {
            field: 'created_at',
            type: "TIMESTAMP"
        },
        updatedAt: {
            field: 'updated_at',
            type: "TIMESTAMP"
        }
    });
    return Transaction;
  };