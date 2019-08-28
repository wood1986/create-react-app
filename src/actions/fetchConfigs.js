import uuidv4 from "uuid/v4";

export const FETCH_CONFIGS = "FETCH_CONFIGS";

// eslint-disable-next-line no-magic-numbers
const generateUuid = () => btoa(String.fromCharCode.apply(null, uuidv4(null, [], 0))).slice(0, -2);

export default (ids) => (dispatch, getState) => {
  // eslint-disable-next-line no-param-reassign, no-prototype-builtins
  ids = ids.filter((id) => !getState().configs.hasOwnProperty(id));

  if (ids.length === 0) {
    return Promise.resolve();
  }

  return Promise.resolve(dispatch({
    "payload": ids.map((id) => ({
      id,
      // eslint-disable-next-line no-magic-numbers
      "type": ["EagerItem", "LazyItem"][~~(Math.random() * 2)],
      "value": generateUuid()
    })),
    "type": FETCH_CONFIGS
  }));
};
