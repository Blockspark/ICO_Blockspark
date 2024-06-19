import User from "./../api/User";
import config from "../../constants/config";

export const getUsers = (list) => ({
    type: "GET_USER_LIST",
    payload: list,
});

export const whitelistedUsers = (list) => ({
    type: "GET_WHITE_LIST_USER_LIST",
    payload: list,
});

export const latestUserList = (list) => ({
    type: "GET_LATEST_USER_LIST",
    payload: list,
});

export const dashboardDetails = (dashboardDetails) => ({
    type: "GET_DASHBOARD_DETAILS",
    payload: dashboardDetails,
});



export const getUserList = (param) => async (dispatch) => {

    if (!param)
        param = {
            page_number: 1,
            page_size: config.page_size
        };
        User.getUserList(param).then((res) => {
        dispatch(getUsers(res.data.result));
    });

};

export const getLatestUsers = () => async (dispatch) => {
        User.getLatestUsers().then((res) => {
        dispatch(latestUserList(res.data.result));
    });
};

export const getDashboardDetails = () => async (dispatch) => {
    User.getDashboardDetails().then((res) => {
        dispatch(dashboardDetails(res.data.result));
    });
};


export const getWhitelistedUsers = (param) => async (dispatch) => {

    if (!param)
        param = {
            page_number: 1,
            page_size: config.page_size
        };
        User.getWhitelistedUsers(param).then((res) => {
        dispatch(whitelistedUsers(res.data.result));
    });

};

/* export const getUserPatient = (authPatientList) => ({
    type: GET_AUTH_PATIENT_LIST,
    payload: authPatientList,
}); */

 