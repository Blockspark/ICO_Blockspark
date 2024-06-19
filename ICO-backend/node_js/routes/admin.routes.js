var express = require('express');
var router = express.Router();
 
const AdminController = require("../controller/admin.controller");
const { UserMiddleware, AuthMiddleware } = require("../middleware");


router.post(
  "/login", AuthMiddleware.validateLoginParams, AdminController.login
); 
router.post(
  "/add-new-user", 
  AuthMiddleware.validateRegisterParams,
  AuthMiddleware.verifyAdminToken,
  UserMiddleware.isUserExist,
  AdminController.addNewUser
);

router.post(
  "/all-user-list", 
  AuthMiddleware.verifyAdminToken,
  AdminController.getAllUsers
);

router.post(
  "/get-whitelisted-users", 
  AuthMiddleware.verifyAdminToken,
  AdminController.getAllWhitelistedUserList
);

router.post(
  "/get-latest-users", 
  AuthMiddleware.verifyAdminToken,
  AdminController.getLatestUserList
);

router.get(
  "/get-pending-whitelist-users", 
  AuthMiddleware.verifyAdminToken,
  AdminController.getPendingWhitelistUsers
);


router.post(
  "/dashboard-details", 
  AuthMiddleware.verifyAdminToken,
  AdminController.getDashboardDetails
);


router.post(
  "/verify-user", 
  AuthMiddleware.verifyAdminToken,
  AuthMiddleware.validateVerifyWhiteUserParams,
  AdminController.verifyWhiteListUser
);

router.post(
  "/multiple-user-verify", 
  AuthMiddleware.verifyAdminToken,
  AuthMiddleware.validateMultipleUserVerifyWhiteUserParams,
  AdminController.verifyMultipleUser
);

router.delete(
  "/user/delete/:id", 
  AuthMiddleware.verifyAdminToken,
  AdminController.deleteUser
);

router.put(
  "/user/update/:id", 
  AuthMiddleware.verifyAdminToken,
  AuthMiddleware.validateUpdateUserParams,
  AdminController.updateUserDetails
);


module.exports = router;