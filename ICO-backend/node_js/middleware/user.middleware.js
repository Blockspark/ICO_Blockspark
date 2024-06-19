const jwt = require("jsonwebtoken");
const config = require("../config/config.js");
const statusCode = require("../config/statuscode");
const { send } = require("../helpers/common");
const { messages, common,validationMessages } = require("../config/constants");
const { verifyToken } = require("../helpers/hash");
const userServices = require("../services/user");
const validationJs = require("../helpers/validation");


exports.isUserExist = async (request, response, next) => {
    let userDetail = await userServices.isUserExist(request.body.email);
    if(!userDetail) return send({ response, statusCode: statusCode.BADREQUEST, message: messages.alreadyRegistered });
    next();
};

//check user is valid or ot from database.
exports.isValidUserCheck = function (req, res, next) {

    var where = {};
    var email = req.body.email.toLowerCase();
    var verified = true;
    where['status'] = 'enabled';
    where['verified'] = verified;
    where['email'] = email;

    User.countDocuments(where, function (err, count) {
      
        if (err) return next(err);
        else if (!count) return next(new Error("User does not exist."));
        else return next();
    });
};

exports.isValidUserCheckById = function (req, res, next) {
    User.countDocuments({ "_id": req.body.user_id }, function (err, count) {
             
            if (err) return next(err);
            else if (!count) return next(new Error("User does not exist."));
            else return next();
        });
};
 