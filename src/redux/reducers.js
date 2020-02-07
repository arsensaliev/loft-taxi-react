import {
    fetchAuthFailure,
    fetchAuthRequest,
    fetchAuthSuccess,
    fetchProfileFailure,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchAddressRequest,
    fetchAddressSuccess,
    fetchAddressFailure,
    fetchRouteRequest,
    fetchRouteSuccess,
    fetchRouteFailure,
    cancelOrder,
    logoutAction
} from "./actions";

import { handleActions } from "redux-actions";
import { combineReducers } from "redux";

const isLoggedIn = handleActions(
    {
        [fetchAuthSuccess]: () => true,
        [logoutAction]: () => false
    },
    false
);

const pending = handleActions(
    {
        [fetchAuthRequest]: () => true,
        [fetchAuthSuccess]: () => false,
        [fetchAuthFailure]: () => false,
        [fetchProfileRequest]: () => true,
        [fetchProfileSuccess]: () => false,
        [fetchProfileFailure]: () => false,
        [fetchAddressRequest]: () => true,
        [fetchAddressSuccess]: () => false,
        [fetchAddressFailure]: () => false,
        [fetchRouteRequest]: () => true,
        [fetchRouteSuccess]: () => false,
        [fetchRouteFailure]: () => false
    },
    false
);

const profile = handleActions(
    {
        [fetchProfileSuccess]: (state, action) => action.payload,
        [logoutAction]: () => null
    },
    null
);

const error = handleActions(
    {
        [fetchAuthRequest]: () => true,
        [fetchAuthSuccess]: () => false,
        [fetchAuthFailure]: () => false,
        [fetchProfileRequest]: () => true,
        [fetchProfileSuccess]: () => false,
        [fetchProfileFailure]: () => false,
        [fetchAddressRequest]: () => true,
        [fetchAddressSuccess]: () => false,
        [fetchAddressFailure]: () => false
    },
    null
);

const address = handleActions(
    {
        [fetchAddressSuccess]: (state, action) => action.payload,
        [logoutAction]: (state, action) => null
    },
    null
);

const route = handleActions(
    {
        [fetchRouteSuccess]: (state, action) => action.payload,
        [cancelOrder]: (state, action) => action.payload,
        [logoutAction]: (state, action) => null
    },
    {
        status: false,
        coordinates: null
    }
);
export default combineReducers({
    isLoggedIn,
    pending,
    profile,
    address,
    route,
    error
});
