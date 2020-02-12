import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import { loadStorage } from "./localstorage";
import createSagaMiddleWare from "redux-saga";
import { rootSagas } from "./redux/sagas";
const initialState = loadStorage();
const sagaMiddleWare = createSagaMiddleWare();
const createAppStore = () => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(sagaMiddleWare),
            window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : noop => noop
        )
    );

    sagaMiddleWare.run(rootSagas);

    return store;
};

export default createAppStore;
