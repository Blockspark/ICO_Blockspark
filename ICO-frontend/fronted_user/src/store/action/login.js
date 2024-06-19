import * as types from '../contants/action-types';

export const loginProgress = (status) => ({
    type: types.LOGIN_PROGRESS,
    payload: status
});

export const loginUserAction = (param, props) => async (dispatch) => {

    return {
        type: types.LOGIN_USER,
        payload: { param, props },
    }
}
