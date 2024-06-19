import * as types from '../contants/action-types';

export const borderRadius = (border) => ({
    type: types.SET_BORDER_RADIUS,
    payload: border
});

export const loginUserAction = (param, props) => async (dispatch) => {

    return {
        type: types.LOGIN_USER,
        payload: { param, props },
    }
}
