const { regex } = require("../config/constants");

exports.isValidEmail = (email) => {
	return regex.email.test(String(email).toLowerCase());
};
exports.isValidPhoneNumber = (phoneNumber) => {
	return regex.phoneNumber.test(String(phoneNumber));
};

exports.imageValidation = (fileType) => {
	let data = ["image/jpeg", "image/png", "image/jpg"];
	return data.includes(fileType);
};

exports.fileValidation = (filetype) => {
	let data = ["application/pdf"];
	return data.includes(filetype);

};

