/* eslint-disable no-underscore-dangle */
import {applyMiddleware, combineReducers, createStore} from "redux";
import configs from "./reducers/configs";
import logger from "redux-logger";
import thunk from "redux-thunk";
require("core-js/proposals/global-this");

const preloadedState = globalThis.__PRELOADED_STATE__ || {};

delete globalThis.__PRELOADED_STATE__;

export default createStore(
  combineReducers({
    ...configs
  }),
  preloadedState,
  applyMiddleware(...[thunk, logger])
);
