import {FETCH_CONFIGS} from "../configs";
import uuidv4 from "uuid/v4";

// eslint-disable-next-line no-magic-numbers
const generateUuid = () => btoa(String.fromCharCode.apply(null, uuidv4(null, [], 0))).slice(0, -2);

export default (ids) => (dispatch, configs) => {
  // eslint-disable-next-line no-param-reassign, no-prototype-builtins
  ids = ids.filter((id) => !configs.hasOwnProperty(id));

  if (ids.length === 0) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return dispatch({
    "payload": ids.map((id) => ({
      id,
      // eslint-disable-next-line no-magic-numbers
      "type": ["EagerItem", "LazyItem"][~~(Math.random() * 2)],
      "value": generateUuid()
    })),
    "type": FETCH_CONFIGS
  });
};
