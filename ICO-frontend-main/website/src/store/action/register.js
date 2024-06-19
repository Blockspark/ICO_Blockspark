import * as types from '../contants/action-types';

export const registerProgress = (status) => ({
    type: types.LOGIN_PROGRESS,
    payload: status
});

export const registerUserAction = (param, props) => async (dispatch) => {

    return {
        type: types.REGISTER_USER,
        payload: { param, props },
    }
}
