import Api from "./Api";
export default {
    getUserList(data) {
        return Api.post("/admin/all-user-list", data);
    },
    getWhitelistedUsers(data) {
        return Api.post("/admin/get-whitelisted-users", data);
    },
    getLatestUsers() {
        return Api.post("/admin/get-latest-users");
    },
    getPendingWhitelistUsers() {
        return Api.get("/admin/get-pending-whitelist-users");
    },
    verifyWhiteListUser(data) {
        if(data.is_multiple){
            return Api.post("/admin/multiple-user-verify",data);
        }else {
            return Api.post("/admin/verify-user",data);
        }
    },
    getDashboardDetails() {
        return Api.post("/admin/dashboard-details");
    },
    deleteUser(id) {
        return Api.delete("/admin/user/delete/"+id);
    },
    updateUserDetail(data) {
        return Api.put("/admin/user/update/"+data.id,data);
    },
    addNewUser(data) {
        return Api.post("/admin/add-new-user",data);
    },
    
}