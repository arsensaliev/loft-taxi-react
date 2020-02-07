import { createAction } from "redux-actions";
import {
    authRequest as auth,
    authSuccess as success,
    authFailure as failure,
    profileRequest as profile,
    profileSuccess,
    profileFailure,
    addressListRequest,
    addressListSuccess,
    addressListFailure,
    routeRequest,
    routeSuccess,
    routeFailure,
    logoutAction as logout,
    cancelOrder as cancel
} from "./types";

export const fetchAuthRequest = createAction(auth);
export const fetchAuthSuccess = createAction(success);
export const fetchAuthFailure = createAction(failure);
export const fetchProfileRequest = createAction(profile);
export const fetchProfileSuccess = createAction(profileSuccess);
export const fetchProfileFailure = createAction(profileFailure);
export const fetchAddressRequest = createAction(addressListRequest);
export const fetchAddressSuccess = createAction(addressListSuccess);
export const fetchAddressFailure = createAction(addressListFailure);
export const fetchRouteRequest = createAction(routeRequest);
export const fetchRouteSuccess = createAction(routeSuccess);
export const fetchRouteFailure = createAction(routeFailure);
export const logoutAction = createAction(logout);
export const cancelOrder = createAction(cancel);
