module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    full_name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true
		},
    email: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
      unique: true
		},
    password: Sequelize.DataTypes.STRING,
    role: {
      type: Sequelize.ENUM("admin", "user"),
    },
    status: {
      type: Sequelize.ENUM("pending", "active", "disabled"),
    },
    white_list_status: {
      type: Sequelize.ENUM("pending", "verify", "disabled"),
      allowNull: null,
			defaultValue: "pending"
		},
    wallet_address: {
      type: Sequelize.DataTypes.TEXT('long'),
      allowNull: true
    },
    whitelisted_at: {
      type: "TIMESTAMP",
      allowNull: true
    },
    createdAt: {
      field: 'created_at',
      type: "TIMESTAMP"
    },
    is_created_by: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true
    },
    updatedAt: {
          field: 'updated_at',
          type: "TIMESTAMP"
    },
    is_updated_by: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true
    },
    reference: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		},
    event_name: {
			type: Sequelize.DataTypes.STRING,
			allowNull: true,
		},
    kyc_status: {
      type: Sequelize.ENUM("pending", "approved", "rejected"),
      allowNull: null,
			defaultValue: "pending"
		},
  });
  return User;
};