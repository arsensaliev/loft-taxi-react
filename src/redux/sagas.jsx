import { fork, call, put, take, takeEvery } from "redux-saga/effects";
import {
    fetchAuthRequest,
    fetchAuthSuccess,
    fetchAuthFailure,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    fetchAddressRequest,
    fetchAddressSuccess,
    fetchAddressFailure,
    fetchRouteRequest,
    fetchRouteSuccess,
    fetchRouteFailure
} from "./actions";

const authRequest = data =>
    fetch(`https://loft-taxi.glitch.me/${data.path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

const paymentRequest = data =>
    fetch("https://loft-taxi.glitch.me/card", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

const addressListRequest = data =>
    fetch(" https://loft-taxi.glitch.me/addressList").then(response =>
        response.json()
    );

const routeRequest = data =>
    fetch(
        ` https://loft-taxi.glitch.me/route?address1=${data.address1}&address2=${data.address2}`
    ).then(response => response.json());

function* authorizationSaga() {
    while (true) {
        const action = yield take(fetchAuthRequest);
        try {
            const result = yield call(authRequest, action.payload);
            result.success
                ? yield put(fetchAuthSuccess(result))
                : yield put(fetchAuthFailure(result));
        } catch (e) {
            yield put(fetchAuthFailure(e));
        }
    }
}

function* paymentSaga() {
    while (true) {
        const action = yield take(fetchProfileRequest);
        try {
            const result = yield call(paymentRequest, action.payload);
            result.success
                ? yield put(fetchProfileSuccess(action.payload))
                : yield put(fetchAuthFailure(result));
        } catch (e) {
            yield put(fetchProfileFailure(e));
        }
    }
}

function* addressListSaga() {
    yield takeEvery(fetchAddressRequest, function*() {
        try {
            const result = yield call(addressListRequest);
            yield put(fetchAddressSuccess(result.addresses));
        } catch (e) {
            yield put(fetchAddressFailure(e));
        }
    });
}

function* routeSaga() {
    while (true) {
        const action = yield take(fetchRouteRequest);
        try {
            const result = yield call(routeRequest, action.payload);
            yield put(fetchRouteSuccess({ status: true, coordinates: result }));
        } catch (e) {
            yield put(fetchRouteFailure(e));
        }
    }
}

export function* rootSagas() {
    yield fork(authorizationSaga);
    yield fork(paymentSaga);
    yield fork(addressListSaga);
    yield fork(routeSaga);
}
