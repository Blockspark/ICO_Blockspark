const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const statusCode = require("../config/statuscode");
const { send } = require("../helpers/common");
const { messages, common,validationMessages } = require("../config/constants");
const { verifyToken } = require("../helpers/hash");
const userServices = require("../services/user");
const adminServices = require("../services/admin");
const validationJs = require("../helpers/validation");
var ethers = require('ethers');

exports.validateVerifyResetPasswordParams = function(request, response, next) {
	if (!request.body.token) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.tokenRequire});
	else if (!request.body.email) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!validationJs.isValidEmail(request.body.email)) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
	else if (!request.body.password) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordRequire });
    else if (request.body.password.length < 8) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordLength });
    next();
};

exports.validateUpdateTransactionParams = async (request, response, next) =>{
	if (!request.body.id){
		return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.idRequire });
	} 
	let isValidTransaction = await userServices.isValidTransaction(request.body.id,request.user.id);
	if (!isValidTransaction){
		return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.somethingWentWrong });
	}
    next();
};


exports.validateVerifyUserResettokenParams = function(request, response, next) {
	if (!request.body.token) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.tokenRequire });
	else if (!request.body.email) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!validationJs.isValidEmail(request.body.email)) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    next();
};

exports.validateSaveTransactionParams = async (request, response, next) => {
	if (!request.body.tokens) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.tokenRequire });
	else if (!request.body.amount) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.amountRequire });
    next();
};


exports.validateForgotPasswordParams = function(request, response, next) {
	if (!request.body.email) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!validationJs.isValidEmail(request.body.email)) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    next();
};


module.exports.verifyAdminToken = async (request, response, next) => {
	let token = request.headers["x-access-token"] || request.headers["authorization"];
	 
	if (!token)
		return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });

	let accessToken = await (token.replace(/ /g, "")).replace(common.tokenType, "");
	 
	jwt.verify( accessToken, config.SECRET,async (err, decoded) => {
		 
		if (!decoded || err)
			return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });
		if (decoded?.role != "admin")
			return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });
		
		let isValidUser = await adminServices.isValidUser(decoded.id);
		if (!isValidUser)
			return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });
		request.user = { id: decoded.id, email: decoded.email, role: decoded.role };
		next();
	});
 
};

module.exports.verifyUserToken = async (request, response, next) => {
	let token = request.headers["x-access-token"] || request.headers["authorization"];
	if (!token)
		return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });

	let accessToken = await (token.replace(/ /g, "")).replace(common.tokenType, "");
	let result = await verifyToken(accessToken);
	if (!result)
		return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });
	if (result?.role != "user")
		return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });
	let userAccessToken = await userServices.isValidUser(result.id);

	if (!userAccessToken)
		return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.sessionExpired });
	request.user = { id: result.id, email: result.email, role: result.role };
	next();
};

exports.validateRegisterParams = async (request, response, next) => {
    
    if (!request.body.full_name) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.fullNameParams });
    else if (!request.body.email) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!validationJs.isValidEmail(request.body.email)) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!request.body.password) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordRequire });
    else if (request.body.password.length < 8) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordLength });
    next();
};

exports.validateUpdateUserParams = async (request, response, next) => {
    
    if (!request.body.full_name) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.fullNameParams });
    else if (!request.body.email) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!validationJs.isValidEmail(request.body.email)) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (request.body.password !="" && request.body.password.length < 8) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordLength });
	else if (!request.body.role) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.roleRequire });
    next();
};

exports.validateUpdateUserpasswordParams = async (request, response, next) => {
     
    if (request.body.currentPassword == "") return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordRequire });
	else if (request.body.newPassword !="" && request.body.newPassword.length < 8) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordLength });
    next();
};

exports.validateUpdateUserPersonalInfoParams = async (request, response, next) => {
    
    if (!request.body.full_name) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.fullNameParams });
    else if (!request.body.email) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!validationJs.isValidEmail(request.body.email)) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    next();
};





exports.validateVerifyWhiteUserParams = async (request, response, next) => {
	
    if (!request.body.address) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.addressRequire });
	if (!request.body.id) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.userIdRequire });
	try {
		await ethers.utils.getAddress(request.body.address)
	} catch (error) {
		console.log(error.reason)
		return send({ response, statusCode: statusCode.BADREQUEST, message: error.reason });
	}
    next();
};


exports.validateSaveWalletAddressParams = async (request, response, next) => {
	
    if (!request.body.address) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.addressRequire });
	try {
		await ethers.utils.getAddress(request.body.address)
	} catch (error) {
		console.log(error.reason)
		return send({ response, statusCode: statusCode.BADREQUEST, message: error.reason });
	}
    next();
}

exports.validateMultipleUserVerifyWhiteUserParams = async (request, response, next) => {	
    if (!request.body.address) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.addressRequire });
    next();
};

exports.validateLoginParams = async (request, response, next) => {
	if (!request.body.email) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!validationJs.isValidEmail(request.body.email)) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.email });
    else if (!request.body.password) return send({ response, statusCode: statusCode.BADREQUEST, message: validationMessages.passwordRequire });
    else next();
};