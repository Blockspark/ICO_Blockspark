const config = require("../config/config");
const db = require("../models");
var bcrypt = require("bcryptjs");

const { messages } = require("../config/constants");
const statusCode = require("../config/statuscode");
const { send,resetPasswordEmail,smtpMail } = require("../helpers/common");
const userServices = require("../services/user");
const passwordResetsServices = require("../services/passwordResets");
const User = db.UserModel;
const PasswordReset = db.PasswordReset;
const {  hashVerify,stringGenerator } = require("../helpers/hash");
const senderAddress = "noreply@metaflixworld.io";
 
 
exports.resetUserPassword =  async (request,response) => {

	const result = await passwordResetsServices.isValidUserResetToken(request.body.token,request.body.email);
	if(!result) return send({ response, statusCode: statusCode.BADREQUEST, message: "Please provide valid token " });

	let password_encrypt = bcrypt.hashSync(request.body.password, 8)
	request.body.newPassword = password_encrypt;

	const getUserResult = await userServices.getUserByEmail(request.body.email);
	request.body.user = getUserResult.dataValues;
	const updateResult = await userServices.updateUserPassword(request.body);
	if (!updateResult) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });

	let query = {
		where: {
			email:request.body.email
		},
	};

	await PasswordReset.destroy(query);
		send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });

}

exports.checkTokenIsValid =  async (request,response) => {
 
	const result = await passwordResetsServices.isValidUserResetToken(request.body.token,request.body.email);
	if(!result) return send({ response, statusCode: statusCode.BADREQUEST, message: "Please provide valid token " });
	await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched });
}

exports.forgotPassword =  async (request,response) => {
 
	const getUserResult = await userServices.getUserByEmail(request.body.email);
	if (!getUserResult){
		await	send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.emailNotAuthorized });
	}

	let token  = stringGenerator(60);
	let resetPasswordData = {
		email: request.body.email,
		token:token
	}
	let query = {
		where: {
			email:request.body.email
		},
	};

	await PasswordReset.destroy(query);
	let link = process.env.FORGOT_PASSWORD_LINK + request.body.email+"/"+token;
	let name = getUserResult.dataValues.full_name;
	let htmlText = await  resetPasswordEmail(name,link);

		// Specify the fields in the email.
		let mailOptions = {
			from: senderAddress,
			to: request.body.email,
			subject: "Reset Password",
			text: htmlText,
			html:htmlText,
		
		  };
		
		  // Send the email.
		  let transporter = await smtpMail();
		  let info = await transporter.sendMail(mailOptions)
		
		  console.log("Message sent! Message ID: ", info.messageId);

	const result = await PasswordReset.create(resetPasswordData);
	await send({ response, statusCode: statusCode.SUCCESS, message: messages.resetPasswordLink });
	
}

/*User Register */
exports.registerUser =  async (request,response) => {
    let password_encrypt = bcrypt.hashSync(request.body.password, 8)
    request.body.password = password_encrypt;
    try {
		const result = await userServices.registerUser(request.body);
		if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
		send({ response, ...result });
	} catch (error) {
		throw Error(error);
	}

};

exports.login = async (request,response) => {
    try {
		const result = await userServices.login(request.body);
		if (!result) return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.somethingWentWrong });
		send({ response, ...result });
	} catch (error) {
		throw Error(error);
	}
}

exports.saveWalletAddress = async (request, response) => { 
	try {
		request.body.user = request.user;
		let body = request.body;
		const getUserResult = await userServices.getUserByEmail(body.user.email);
		if (!getUserResult){
			await	send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.emailNotAuthorized });
		}else if(getUserResult.dataValues.wallet_address && body.address.toLowerCase() ==  getUserResult.dataValues.wallet_address.toLowerCase()){
			await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched });
		}else if (getUserResult.dataValues.wallet_address && getUserResult.dataValues.wallet_address != "" &&  body.address.toLowerCase() !=  getUserResult.dataValues.wallet_address.toLowerCase()){
			await send({ response, statusCode: statusCode.BADREQUEST, message: messages.userWalletAddressIsNotMatch });
		}else {
			const result = await userServices.saveWalletAddress(body);
			if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
			await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
		}
	  
  } catch (error) {
	  	throw Error(error);
  } 
};

exports.getUserDetail = async (request, response) => { 
	try {
		 
		const getUserResult = await userServices.getUserByEmail(request.user.email);
		if (!getUserResult){
			await	send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.emailNotAuthorized });
		}else {
			await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: getUserResult });
		}
	  
  } catch (error) {
	  	throw Error(error);
  } 
};

exports.saveTransactionDetail = async (request, response) => { 
	try {
		 
		request.body.user = request.user;
		const result = await userServices.saveTransactionData(request.body);
		if (!result){
			await	send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.somethingWentWrong });
		}else {
			await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched ,result:result});
		}
	  
  } catch (error) {
	  	throw Error(error);
  } 
};


exports.getTransactionList = async (request, response) => {
	 
	try {
	  request.body.user_id = request.user.id;
	  const result = await userServices.getAllTransaction(request.body);
	  if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};

exports.updateTransactionDetail = async (request, response) => { 
	try {
		
		request.body.user = request.user;
		const result = await userServices.updateTransactionData(request.body);
		if (!result){
			await	send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.somethingWentWrong });
		}else {
			await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched ,result:result});
		}
	  
  } catch (error) {
	  	throw Error(error);
  } 
};

exports.sendTestMail = async (request, response) => { 
	try { 
		
		// Specify the fields in the email.
		  let mailOptions = {
			from: senderAddress,
			to: "test420@mailinator.com",
			subject: "Sending with SendGrid is Fun",
			text: "and easy to do anywhere, even with Node.js",
			html: "and easy to do anywhere, even with Node.js",
		  };
		
		  // Send the email.
		  let transporter = await smtpMail();
		  let info = await transporter.sendMail(mailOptions)
		
		console.log("Message sent! Message ID: ", info.messageId); 
		await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched });
  } catch (error) {
	  	throw Error(error);
  } 
};


exports.updateUserKycStatus = async (request, response) => { 
	try {
		const result = await userServices.updateUserKycDetail(request.body);
		await send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
	  
	} catch (error) {
		throw Error(error);
	} 
};

exports.updateUserPersonalInfo = async (request, response) => { 
	try {
 
		request.body.user = request.user;
		const isValidUser = await userServices.isValidUser(request.user.id);
		if (!isValidUser) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.invalidUser });
		const isUserEmailExistCheck = await userServices.isUserEmailExist(request.user.id,request.body.email);
 		if (!isUserEmailExistCheck) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.alreadyTaken });
		
		const result = await userServices.updateUserDetails(request.body);
		if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
	  
	} catch (error) {
		throw Error(error);
	} 
};

exports.updateUserPasswordInfo = async (request, response) => { 
	try {
  
		request.body.user = request.user;
		let password_encrypt = bcrypt.hashSync(request.body.newPassword, 8)
		request.body.newPassword = password_encrypt;
 
		const isValidUser = await userServices.isValidUser(request.user.id);
	  
		if (!isValidUser){
			return send({ response, statusCode: statusCode.BADREQUEST, message: messages.invalidUser });
		}else  if (!hashVerify(request.body.currentPassword, isValidUser.password)){
			send({ response, statusCode: statusCode.BADREQUEST, message: messages.currentPasswordIsNotMatch });
		}else {
			const result = await userServices.updateUserPassword(request.body);
			if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  		send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
		}
		
	} catch (error) {
		throw Error(error);
	} 
};

