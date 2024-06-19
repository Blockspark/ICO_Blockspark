const configs = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");

const { randomCharacters } = require("../config/constants");
let SALT_WORK_FACTOR = 10;

exports.generateNeverExpringToken = (user) => {
	return jwt.sign(user,
		configs.SECRET);
};

exports.generateToken = (user, expiresIn) => {
	return jwt.sign(user,
		configs.SECRET, {
			expiresIn
		});
};

exports.verifyToken = (accessToken) => {
	return jwt.verify(accessToken, configs.SECRET, (err, decode) => {
		if (err)
			return false;
		else
			return decode;
	});
};

exports.generateVideoConferenceToken = (user) => {
	return jwt.sign(user,
		configs.videoConferenceLinkToken, {
			expiresIn: "24h"
		});
};

exports.verifyVideoConferenceToken = (accessToken) => {
	return jwt.verify(accessToken, configs.videoConferenceLinkToken, (err, decode) => {
		if (err)
			return false;
		else
			return decode;
	});
};

exports.hashGenerator = (pain) => {
	return bcrypt.hashSync(pain, SALT_WORK_FACTOR);
};

exports.hashVerify = (plain, hash) => {
	return bcrypt.compareSync(plain, hash);
};

exports.randomPasswordGenerator = (length = 6) => {
	let result = "";
	let characters = randomCharacters.randomStrings;
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

exports.stringGenerator = (length = 10) => {
	let result = "";
	let characters = randomCharacters.randomStrings;
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

exports.randomFileNameGenerator = (value) => {
	let fileName = String(value).replace(/\s+/g, ""), name = path.parse(fileName).name, ext = path.parse(fileName).ext;
	if (name.length > 8) name = name.substring(0, 8);
	let finalName = `${name}_${Date.now()}${ext}`;
	return finalName;
};

exports.generateOtp = () => {
	return String(Math.floor(100000 + Math.random() * 900000));
};