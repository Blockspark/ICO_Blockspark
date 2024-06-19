import { SHOW_LOADER } from "../contants/action-types";
 
export const setLoader = (status) => ({
    type: SHOW_LOADER,
    payload: status
});
 