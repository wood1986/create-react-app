import {FETCH_CONFIGS} from "../actions/fetchConfigs";
import createReducer from "../createReducer";

export default {
  "configs": createReducer({}, {
    [FETCH_CONFIGS]: (state, action) => {
      const nextState = {...state};
      action.payload.forEach((config) => {
        nextState[config.id] = config;
      });

      return nextState;
    }
  })
};
