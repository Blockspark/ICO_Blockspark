const config = require("../config/config");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { messages } = require("../config/constants");
const statusCode = require("../config/statuscode");
const { send } = require("../helpers/common");
const adminServices = require("../services/admin");
const userServices = require("../services/user");


/*User Register */
exports.addNewUser =  async (request,response) => {
    let password_encrypt = bcrypt.hashSync(request.body.password, 8)
    request.body.password = password_encrypt;
	request.body.is_created_by = request.user.id;
    try {
		const result = await adminServices.addNewuser(request.body);
		if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
		send({ response, ...result });
	} catch (error) {
		throw Error(error);
	}

};

exports.login = async (request,response) => {
    try {
		const result = await adminServices.login(request.body);
		if (!result) return send({ response, statusCode: statusCode.UNAUTHORIZED, message: messages.somethingWentWrong });
		send({ response, ...result });
	} catch (error) {
		throw Error(error);
	}
}

exports.getAllUsers = async (request, response) => {
	 
	  try {
		
		request.body.user_id = request.user.id;
		const result = await adminServices.getAllUsers(request.body);
		if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
		send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
	} catch (error) {
		console.log("error",error)
		throw Error(error);
	} 
};

exports.getAllWhitelistedUserList = async (request, response) => {
	 
	 try {
		request.body.user_id = request.user.id;
	   const result = await adminServices.getAllWhitelistedUserList(request.body);
	   if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	   send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
   } catch (error) {
	   console.log("error",error)
	   throw Error(error);
   } 
};


exports.getLatestUserList = async (request, response) => { 
	try {
	  const result = await adminServices.getLatestUsers();
	  if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};

exports.getPendingWhitelistUsers = async (request, response) => { 
	try {
	  const result = await adminServices.getPendingWhitelistUsers();
	  if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};



exports.getDashboardDetails = async (request, response) => { 
	try {
	  const getTotalUsers = await adminServices.getTotalUsers();
	  const totalWhiteListUsers = await adminServices.getTotalWhiteListUsers();
	  
	  let result = {
		totalUsers:getTotalUsers,
		totalWhiteListUsers: totalWhiteListUsers,
	  }

	  if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};

exports.verifyWhiteListUser = async (request, response) => { 
	try {
	  const result = await adminServices.verifyWhiteListUser(request.body);
	  if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};

exports.updateUserDetails = async (request, response) => { 
	try {
		
		const isValidUser = await userServices.isValidUser(request.params.id);
		if (!isValidUser) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.invalidUser });

		if(request.body.password != ""){
			let password_encrypt = bcrypt.hashSync(request.body.password, 8)
    		request.body.password = password_encrypt;
		}
		request.body.is_updated_by = request.user.id;
		const result = await adminServices.updateUserDetails(request.body);
		if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};




exports.verifyMultipleUser = async (request, response) => { 
	try {
	  const result = await adminServices.verifyMultipleUser(request.body);
	  if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong });
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};

exports.deleteUser = async (request, response) => { 
	try {
		
		const isValidUser = await userServices.isValidUser(request.params.id);
		if (!isValidUser) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.invalidUser });
		const result = await userServices.deleteUser(request.params.id);
	  	if (!result) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.somethingWentWrong }); 
	  send({ response, statusCode: statusCode.SUCCESS, message: messages.dataFetched, result: result });
  } catch (error) {
	  console.log("error",error)
	  throw Error(error);
  } 
};



