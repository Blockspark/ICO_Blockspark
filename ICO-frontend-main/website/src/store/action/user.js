import User from "./../api/User";
import config from "../../constants/config";

export const getUsers = (detail) => ({
    type: "GET_USER_DETAIL",
    payload: detail,
});

export const setFullUserName = (detail) => ({
    type: "GET_FULL_NAME",
    payload: detail,
});
 
export const getUserDetail = () => async (dispatch) => {

   await User.getUserDetail().then((res) => {
        dispatch(getUsers(res.data.result));
    });
};
 
export const getUserFullName = (data) => async (dispatch) => {
    dispatch(setFullUserName(data));
 };
 