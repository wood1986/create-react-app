import {applyMiddleware, combineReducers, createStore} from "redux";
import configs from "./reducers/configs";
import logger from "redux-logger";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({
    configs
  }),
  applyMiddleware([thunk, logger])
);

