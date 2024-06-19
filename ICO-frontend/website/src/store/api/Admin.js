import Api from "./Api";
export default {
    register(data) {
        return Api.post("/admin/register", data);
    },
    login(data) {
        return Api.post("/admin/login", data);
    }
}