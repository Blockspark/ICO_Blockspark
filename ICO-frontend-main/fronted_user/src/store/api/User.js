import Api from "./Api";
const UserApiData = {
    register(data) {
        return Api.post("/user/register", data);
    },
    login(data) {
        return Api.post("/user/login", data);
    },
    saveWalletAddress(data) {
        return Api.post("/user/save-wallet-address", data);
    },
    getUserDetail() {
        return Api.post("/user/get-detail");
    },
    updatePersonalInfo(data) {
        return Api.post("/user/update-personal-info", data);
    },
    updatePasswordInfo(data) {
        return Api.post("/user/update-password-info", data);
    },
    verifyUserRestToken(data) {
        return Api.post("/user/verify-user-rest-token",data);
    },
    userPasswordReset(data) {
        return Api.post("/user/password/reset",data);
    },
    verifyResetPassword(data) {
        return Api.post("/user/password/verify-reset-password",data);
    },
    saveTransactionDetail(data) {
        return Api.post("/user/save-transaction-detail",data);
    },
    updateTransactionDetail(data) {
        return Api.post("/user/update-transaction-detail",data);
    },
    getTransactionList(data){
        return Api.post("/user/transaction-list",data);
    }
    
}

export default UserApiData;