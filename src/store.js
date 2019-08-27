import {applyMiddleware, combineReducers, createStore} from "redux";
import configs from "./reducers/configs";
import logger from "redux-logger";
import thunk from "redux-thunk";
require("core-js/proposals/global-this");

// eslint-disable-next-line no-underscore-dangle
const preloadedState = globalThis.__PRELOADED_STATE__ || {
  "configs": {
    "0": {
      "id": 0,
      "type": "EagerItem",
      "value": "m3uzYVlbQPSpRlaBYoAAfA"
    },
    "1": {
      "id": 1,
      "type": "LazyItem",
      "value": "75vSyAAXTR+78WvKYwgD8Q"
    }
  }
};

// eslint-disable-next-line no-underscore-dangle
delete globalThis.__PRELOADED_STATE__;

export default createStore(
  combineReducers({
    ...configs
  }),
  preloadedState,
  applyMiddleware(...[thunk, logger])
);
