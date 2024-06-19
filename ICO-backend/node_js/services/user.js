const configs = require("../config/config");
const { messages, documentUrl, common, mailSubjects } = require("../config/constants");
const statusCode = require("../config/statuscode");
const { generateToken, hashVerify, verifyToken, hashGenerator, generateOtp } = require("../helpers/hash");
const db = require("../models");
const User = db.UserModel;
const Transaction= db.Transaction;
const { sequelize } = require("../models");
const { currentUtcTime } = require("../helpers/date");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require("underscore");

exports.updateUserDetails = async (body) => {
	let email = body.email;
	let full_name = body.full_name;
	let id = body.user.id;
	let updateBody =  { full_name:full_name,email:email }
	 
	let data = await User.update(
		updateBody,
		{ where: {  id: id} });
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.updatePersonalInfoSuccess };
};

exports.updateUserPassword = async (body) => {
	let email = body.user.email;
	let id = body.user.id;
	let password = body.newPassword;
	let updateBody =  { password:password }
	 
	let data = await User.update(
		updateBody,
		{ where: {  id: id} });
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.changePasswordSuccess };
}

exports.saveTransactionData = async (body) => {

	body.user_id = body.user.id;
	const result = await Transaction.create(body);
	if (!result)
		return;

	return { statusCode: statusCode.SUCCESS, message: messages.dataFetched, result };
};

exports.updateTransactionData = async (body) => {

	 
	let user_id = body.user.id;
	let id = body.id;
	let from_address = body.from_address;
	let transaction_hash = body.transaction_hash;
 	let updateBody =  { from_address:from_address,transaction_hash:transaction_hash,status:body.status,coin:body.coin_name };
 
	let data = await Transaction.update(
		updateBody,
		{ where: {  id: id,user_id:user_id} });
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.dataFetched };
};


exports.isValidTransaction = async (id,user_id) => {
	let result = await Transaction.findOne({
		where: {
			id: id,
			user_id:user_id
		}
	});
	if (!result)
		return false;
	return true;
};


exports.getAllTransaction = async (queryData) => {
	let user_id = queryData.user_id;
	let { page_number = 1, page_size = 10,order_by_direction = "DESC", order_by = "id" } = queryData;
	if (page_number == 0)
		return;
	
	order_by = order_by.toLowerCase();
	order_by_direction = order_by_direction.toUpperCase();

	const offset = page_size * (page_number - 1);
	const limit = parseInt(page_size);
	let query = {
		offset: offset,
		limit: limit,
		where: {
			user_id:user_id
		},
		attributes: ["id", "tokens", "amount",'transaction_hash',"from_address","created_at","status","coin"],
		order: [
			[
				Sequelize.col(order_by),
				order_by_direction,
			]
		]
	};
	let { rows, count } = await Transaction.findAndCountAll(query);
	return { data: rows, totalRecord: count, currentPage: parseInt(page_number), totalPages: Math.ceil(count / limit) };
};

exports.registerUser = async (body) => {

	body.role = "user";
	body.status = "active";
	const result = await User.create(body);
	if (!result)
		return;

	return { statusCode: statusCode.SUCCESS, message: messages.registeredSuccess, result };
};

exports.updateUserKycDetail = async (body) => {
	 
	let kyc_status = "pending";
	if(body.event == 'request.pending'){
		kyc_status = 'pending'
	}else if(body.event == 'verification.accepted'){
		kyc_status = 'approved'
	}else if(body.event == 'verification.declined'){
		kyc_status = 'rejected'
	}
	let updateBody = { reference: body.reference,event_name:body.event,kyc_status:kyc_status }
	let data = await User.update(updateBody,{ where: { email:body.email }});
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.dataFetched };

}

exports.getUserByWalletAddress = async (wallet_address) => {
	let query = {
		where: {
			wallet_address:wallet_address,
			role:"user"
		},
		attributes: {
			exclude: ["createdAt", "updatedAt"]
		}
	};
	let data = await User.findOne(query);
	return data;
};


exports.isVerifyWalletAddressById = async (id,wallet_address) => {
	let query = {
		where: {
			wallet_address:wallet_address,
			id:id,
			role:"user"
		},
		attributes: {
			exclude: ["createdAt", "updatedAt"]
		}
	};
	let data = await User.findOne(query);
	return data;
};


exports.getUserByEmail = async (email) => {
	let query = {
		where: {
			email:email,
			role:"user"
		},
		attributes: {
			exclude: ["createdAt", "updatedAt"]
		}
	};
	let data = await User.findOne(query);
	return data;
};


exports.login = async (body) => {
	const result = await this.getUserByEmail(body.email);
	 
 	if (!result || result.dataValues.status != 'active')
		return { statusCode: statusCode.UNAUTHORIZED, message: messages.emailNotAuthorized };
	if (!result.dataValues.password || !hashVerify(body.password, result.dataValues.password))
		return { statusCode: statusCode.UNAUTHORIZED, message: messages.wrongPassword };

	delete body["email"];
	delete body["password"];

	let token = generateToken({ id: result.dataValues.id, email: result.dataValues.email, role: "user" }, configs.tokenExpiryTime);
	delete result.dataValues["password"];
	result.dataValues["token"] = token;
	return { statusCode: statusCode.SUCCESS, message: messages.loginSucess, result };; 
};

exports.saveWalletAddress = async (body) => {

	let id = body.user.id;
	let wallet_address = body.address;
	let updateBody = { wallet_address: wallet_address }
	let data = await User.update(
		updateBody,
		{ where: {  id: id,wallet_address:{[Op.is]: null}} });
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.dataFetched };
};


exports.isUserExist = function (email) {
	return User.count({ where: { email: email } })
	.then(count => {
	  if (count != 0) {
		return false;
	  }
	  return true;
  });
};


exports.isUserEmailExist = function (id,email) {
	return User.count({ where: { email: email ,id:{[Op.ne]: id}} })
	.then(count => {
	  if (count != 0) {
		return false;
	  }
	  return true;
  });
};

exports.isUserWalletExistOrNot = function (id,email) {
	return User.count({ where: { id:id,wallet_address: wallet_address } })
	.then(count => {
	  if (count != 0) {
		return false;
	  }
	  return true;
  });
};

exports.isValidUser = async (id) => {
	let result = await User.findOne({
		where: {
			id: id
		}
	});
	if (!result)
		return false;
	return result;
};

exports.deleteUser = async (id) => {
	let query = {
		where: {
			id:id,
			role:"user"
		},
	};
	let result = await User.destroy(query);
	return { statusCode: statusCode.SUCCESS, message: messages.deleteSuccess, result };
};