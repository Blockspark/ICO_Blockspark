const configs = require("../config/config");
const { messages, documentUrl, common, mailSubjects } = require("../config/constants");
const statusCode = require("../config/statuscode");
const { generateToken, hashVerify, verifyToken, hashGenerator, generateOtp } = require("../helpers/hash");
const db = require("../models");
const User = db.UserModel;
const CoinPriceModel = db.CoinPriceModel;
const ethers = require('ethers');
const { sequelize } = require("../models");
const  userServices  = require("./user");
const { currentUtcTime } = require("../helpers/date");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const _ = require("underscore");

exports.setCoinPrice  = async (body) => {
 
	return await CoinPriceModel
	.findOne({ where: { coin: body.coin } })
	.then(async function(obj) {
		// update
		if(obj){
			return CoinPriceModel.update(
				body,
				{ where: { coin: body.coin } })
		}else {
			return   await CoinPriceModel.create(body);
		}
	})
}
exports.updateUserDetails = async (body) => {
	let email = body.email;
	let id = body.id;
	let full_name = body.full_name;
	let role = body.role;
	let password = body.password;
	let is_updated_by = body.is_updated_by;
	
	let updateBody = {}
	if(password != ""){
		updateBody = { role: role,full_name:full_name,email:email,password:password,is_updated_by:is_updated_by }
	}else {
		updateBody = { role: role,full_name:full_name,email:email,is_updated_by:is_updated_by }
	}
	let data = await User.update(
		updateBody,
		{ where: {  id: id} });
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.updateSuccess };
};


exports.verifyWhiteListUser = async (body) => {
	let address = body.address;
	let id = body.id;
	const result = await userServices.isVerifyWalletAddressById(id,address);
	if (!result)
		return { statusCode: statusCode.BADREQUEST, message: messages.walletAddressIsNotMatch };

	let data = await User.update(
		{ white_list_status: "verify",whitelisted_at:sequelize.fn('NOW') },
		{ where: { wallet_address: address, id: id} });
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.verifyWhitelistedSuccess };
};


exports.verifyMultipleUser = async (body) => {
	let address = body.address;
	let data = await User.update(
		{ white_list_status: "verify",whitelisted_at:sequelize.fn('NOW') },
		{ where: { wallet_address: address, role:"user" } });
	if (data.includes(0))
		return;
	return { statusCode: statusCode.SUCCESS, message: messages.verifyWhitelistedSuccess };
};




exports.addNewuser = async (body) => {

	body.status = "active";
	const result = await User.create(body);
	if (!result)
		return;

	return { statusCode: statusCode.SUCCESS, message: messages.createSuccess, result };
};


exports.getAdminByEmail = async (email) => {
	let query = {
		where: {
			email:email,
			role:"admin"
		},
		attributes: {
			exclude: ["createdAt", "updatedAt"]
		}
	};
	let data = await User.findOne(query);
	return data;
};

exports.login = async (body) => {
	const result = await this.getAdminByEmail(body.email);
	 
 	if (!result || result.dataValues.status != 'active')
		return { statusCode: statusCode.UNAUTHORIZED, message: messages.emailNotAuthorized };
	if (!result.dataValues.password || !hashVerify(body.password, result.dataValues.password))
		return { statusCode: statusCode.UNAUTHORIZED, message: messages.wrongPassword };

	delete body["email"];
	delete body["password"];

	let token = generateToken({ id: result.dataValues.id, email: result.dataValues.email, role: "admin" }, configs.tokenExpiryTime);
	delete result.dataValues["password"];
	result.dataValues["token"] = token;
	return { statusCode: statusCode.SUCCESS, message: messages.loginSucess, result };; 
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

exports.isValidUser = async (id) => {
	let result = await User.findOne({
		where: {
			id: id,
			role:'admin'
		}
	});
	if (!result)
		return false;
	return true;
};

exports.getTotalUsers = async (queryData) => {
	
	const totalsUser = await User.count({
		where: { role: "user" },
	  });

	return totalsUser;
};

exports.getTotalWhiteListUsers = async (queryData) => {
	
	const totalsUser = await User.count({
		where: { role: "user",white_list_status:"verify" },
	  });

	return totalsUser;
};




exports.getAllUsers = async (queryData) => {
	let user_id = queryData.user_id;
	let { page_number = 1, page_size = 10, search = "", order_by_direction = "DESC", order_by = "id",role="" } = queryData;
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
			[Op.or]: {
				full_name: {
					[Op.like]: "%" + search + "%"
				},
				email: {
					[Op.like]: "%" + search + "%"
				},
			},
			role:{
				[Op.like]: "%" + role + "%"
			},
			id:{[Op.ne]: user_id}
		},
		attributes: ["id", "full_name", "email",'role',"white_list_status","created_at","kyc_status"],
		order: [
			[
				Sequelize.col(order_by),
				order_by_direction,
			]
		]
	};
	let { rows, count } = await User.findAndCountAll(query);
	return { data: rows, totalRecord: count, currentPage: parseInt(page_number), totalPages: Math.ceil(count / limit) };
};

exports.getAllWhitelistedUserList = async (queryData) => {
	let user_id = queryData.user_id;
	let { page_number = 1, page_size = 10, search = "", order_by_direction = "desc", order_by = "id",status="" } = queryData;
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
			[Op.or]: {
				full_name: {
					[Op.like]: "%" + search + "%"
				},
				email: {
					[Op.like]: "%" + search + "%"
				},
				
			},
			white_list_status:{
				[Op.like]: "%" + status + "%"
			},
			id:{[Op.ne]: user_id}
		},
		attributes: ["id", "full_name", "email","white_list_status","wallet_address","whitelisted_at","kyc_status"],
		order: [
			[
				Sequelize.col(order_by),
				order_by_direction,
			]
		]
	};
	let { rows, count } = await User.findAndCountAll(query);
	return { data: rows, totalRecord: count, currentPage: parseInt(page_number), totalPages: Math.ceil(count / limit) };
};


exports.getLatestUsers = async () => {
	 
	let query = {
		limit: 10,
		where: {
			role: "user"
		},
		attributes: ["id", "full_name", "email","white_list_status","wallet_address","whitelisted_at","created_at"],
		order: [ [ 'created_at', 'DESC' ]]
	};
	let { rows, count } = await User.findAndCountAll(query);
	return { data: rows, totalRecord: count };
};

exports.getPendingWhitelistUsers = async () => {
	 
	let query = {
		where: {
			white_list_status: "pending",
			wallet_address:{[Op.ne]: null}
		},
		attributes:  ["wallet_address"],
		raw : true,
		order: [ [ 'created_at', 'DESC' ]]
	};

	let rows    = await User.findAll(query).then(function(users) {
		return _.map(users, function(user) { return user.wallet_address; })
	  });
	return { data: rows };
};

exports.getDistinctWhitelistUsers = async () => {
	let query = {
		where: {
			white_list_status: "pending",
			kyc_status: "approved",
			wallet_address:{[Op.ne]: null}
		},
		attributes:  ["wallet_address"],
		raw : true,
		group: ['wallet_address']
	};

	let rows    = await User.findAll(query).then(async function(users) {
		let addressArray = [];
		for(var i=0;i< users.length;i++){
			 const res  = await ethers.utils.isAddress(users[i].wallet_address)
			 if(res){
				//return user.wallet_address; 
				addressArray.push(users[i].wallet_address)
			} 
			
		}
		return addressArray
	 
	  });
	return { data: rows };
};