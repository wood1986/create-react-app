import React from "react";

export const ConfigsContext = React.createContext();

export const FETCH_CONFIGS = "FETCH_CONFIGS";

export const ConfigsReducer = () => {
  const reducers = {
    [FETCH_CONFIGS]: (state, action) => {
      const nextState = {...state};
      action.payload.forEach((config) => {
        nextState[config.id] = config;
      });
      return nextState;
    }
  };

  return (state, action) => (reducers[action.type] || (() => {
    throw new Error(`unknown action.type ${action.type}`);
  }))(state, action);
};
