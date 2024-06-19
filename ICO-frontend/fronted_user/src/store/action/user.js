import User from "./../api/User";
import config from "../../constants/config";

export const getTransactions = (list) => ({
    type: "GET_TRANSACTIONS_LIST",
    payload: list,
});

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


export const getTransactionList = (param) => async (dispatch) => {

    if (!param)
        param = {
            page_number: 1,
            page_size: 10
        };
        User.getTransactionList(param).then((res) => {
        dispatch(getTransactions(res.data.result));
    });

};
 