const db = require("../models");
const PasswordReset = db.PasswordReset;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require("underscore");

exports.isValidUserResetToken = function (token,email) {
	return PasswordReset.count({ where: { token: token ,email:email} })
	.then(count => {
	  if (count != 0) {
		return true;
	  }
	  return false;
  });
};