module.exports = (sequelize, Sequelize) => {
  const PasswordReset = sequelize.define("password_resets", {
    email: {
			type: Sequelize.DataTypes.STRING,
			allowNull: false,
      unique: true
		},
    token: {
      type: Sequelize.DataTypes.TEXT('long'),
      allowNull: true
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
  return PasswordReset;
};