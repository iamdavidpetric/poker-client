import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { legacy_createStore, compose, applyMiddleware } from "redux";

import { createBrowserHistory } from "history";
import { createRouterMiddleware } from "@lagunovsky/redux-react-router";

import sagas from "../sagas";
import { storeConfig } from "./config";
import rootReducer from "./rootReducer";

const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const loggerMiddleware = createLogger({
  collapsed: (_getState, _action, logEntry) => !logEntry.error,
  diff: true,
});
const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware, routerMiddleware];
middlewares.push(loggerMiddleware);

const enhancer = compose(...[], applyMiddleware(...middlewares));

const persistedReducer = persistReducer(storeConfig, rootReducer);
const store = legacy_createStore(persistedReducer, enhancer);
const persistor = persistStore(store, {}, () => {});

sagaMiddleware.run(sagas);
const reduxStore = () => ({ store, persistor });

export default reduxStore;
