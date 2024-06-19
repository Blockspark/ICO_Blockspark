var express = require('express');
var router = express.Router();
 
const UserController = require("../controller/user.controller");
const { UserMiddleware, AuthMiddleware } = require("../middleware");


router.post(
  "/login", AuthMiddleware.validateLoginParams, UserController.login
); 

router.post(
  "/register", 
  AuthMiddleware.validateRegisterParams,
  UserMiddleware.isUserExist,
  UserController.registerUser
);

router.post(
  "/save-wallet-address", 
  AuthMiddleware.verifyUserToken,
  AuthMiddleware.validateSaveWalletAddressParams,
  UserController.saveWalletAddress
);

router.post(
  "/update-kyc-status",
  UserController.updateUserKycStatus
);

router.post(
  "/update-personal-info",
  AuthMiddleware.verifyUserToken,
  AuthMiddleware.validateUpdateUserPersonalInfoParams,
  UserController.updateUserPersonalInfo
);

router.post(
  "/update-password-info",
  AuthMiddleware.verifyUserToken,
  AuthMiddleware.validateUpdateUserpasswordParams,
  UserController.updateUserPasswordInfo
);

router.post(
  "/get-detail",
  AuthMiddleware.verifyUserToken,
  UserController.getUserDetail
);

router.post(
  "/save-transaction-detail",
  AuthMiddleware.verifyUserToken,
  AuthMiddleware.validateSaveTransactionParams,
  UserController.saveTransactionDetail
);

router.post(
  "/update-transaction-detail",
  AuthMiddleware.verifyUserToken,
  AuthMiddleware.validateUpdateTransactionParams,
  UserController.updateTransactionDetail
);

router.post(
  "/transaction-list",
  AuthMiddleware.verifyUserToken,
  UserController.getTransactionList
);

  
router.post(
  "/send-testmail",
  UserController.sendTestMail
);
  
router.post(
  "/password/reset",
  AuthMiddleware.validateForgotPasswordParams,
  UserController.forgotPassword
);

router.post(
  "/verify-user-rest-token",
  AuthMiddleware.validateVerifyUserResettokenParams,
  UserController.checkTokenIsValid
);

router.post(
  "/password/verify-reset-password",
  AuthMiddleware.validateVerifyResetPasswordParams,
  UserController.resetUserPassword
);

module.exports = router;