export default (initialState, handlers) => (state = initialState, action) => {
  // eslint-disable-next-line no-prototype-builtins
  if (handlers.hasOwnProperty(action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};
