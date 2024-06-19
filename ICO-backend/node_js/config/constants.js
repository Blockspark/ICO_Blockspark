const configs = require("./config");


const messages = {
 
	//patient
	wrongOldPassword: "Incorrect old password.",
	passwordChanged: "Password reset Successfully.",
	sameNewPassword: "New password should be different than old password.",
	//filenotsupported
	invalidFile: "Only jpg,jpeg and png extension images are allowed.",
	invalidDocument: "Only pdf extension document allowed",
	statusUpdateFailed: "Status updating failed.",
	createSuccess: "Created successfully.",
	allInputRequired: "All inputs are required.",
	notAuthorizedd: "This email or password is not authorized.",
	loginSucess: "You are logged in successfully.",
	alreadyRegistered: "This email id is already registred.",
	alreadyTaken: "This email is taken by another account",
	somethingWentWrong: "Failed, Something went wrong! Try again.",
	notValidInputs: "Inputs are not valid or missing.",
	unAuthorized: "You are not unauthorized to access.",
	sessionExpired: "Your session is expired.",
	emailNotAuthorized: "Email id is not authorized.",
	walletAddressIsNotMatch: "User details and wallet address not match",
	currentPasswordIsNotMatch: "Invalid current password",
	walletAddressNotFound: "User wallet address not match",
	wrongPassword: "Incorrect email address and / or password.",
	wrongParams: "You have passed invalid params.",
	registeredSuccess:"your account has been registered successfully",
	dataFetched: "Successfully.",
	verifyWhitelistedSuccess:"User account has been successfully whitelisted",
	updateSuccess:"User account has been successfully updated",
	updatePersonalInfoSuccess:"Your personal info has been successfully updated",
	changePasswordSuccess:"Your password has been successfully updated",
	invalidUser:"User does not exist",
	deleteSuccess:"User has been deleted successfully",
	userWalletAddressIsNotMatch:"Your wallet address and account details is not matched",
	resetPasswordLink:"A reset link has been sent too your email address"
};

 
const validationMessages = {
	email: "Email is not valid",
	fullNameParams: "Fullname is not valid.",
	passwordLength :"Password should be atleast 8 in length",
	passwordRequire :"Password is not valid",
	addressRequire:"Please provide a valid user address",
	userIdRequire:"Please provide a valid user id",
	roleRequire :"Please select a valid role",
	transactionHashRequire:"Provide valid transaction hash",
	tokenRequire:"Provide valid token detail",
	amountRequire:"Provide valid amount",
	fromAddressRequire:"Provide valid from address",
	idRequire:"Provide valid from transaction id"
};


const randomCharacters = {
	randomStrings: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

const dateTimeFormat = {
	default: "YYYYMMDD HHmmss",
	dateTime: "YYYY-MM-DD HH:mm:ss",
	date: "YYYY-MM-DD",
	time: "HH:mm:ss",
	_time: "HH:mm",
	__time: "h:mm A",
};

const regex = {
	email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	phoneNumber: /^[1-9][0-9]{9,14}$/,
	firstName: /^.{1,50}$/,
	lastName: /^.{1,50}$/,
	password: /^.{8,}$/,
	clinicName: /^.{1,30}$/,
	newPassword: /^.{8,}$/,
	notNull: /^(?!\s*$).+/,
	queston: /^.{1,200}$/,
	answer: /^.{1,300}$/,
};

const common = {
	tokenType: "Bearer"
};



module.exports = {
	 messages, randomCharacters, dateTimeFormat,
	common, regex, validationMessages
};
