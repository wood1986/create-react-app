import {Base64} from "js-base64";
import uuidv4 from "uuid/v4";

export const FETCH_CONFIGS = "FETCH_CONFIGS";

const generateUuid = () => Base64.encodeURI(String.fromCharCode.apply(null, uuidv4(null, [], 0)));

export const fetchConfigs = (ids) => (dispatch, getState) => {
  ids = ids.filter((id) => !getState().configs.hasOwnProperty(id));

  if (ids.length === 0) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    resolve({
      "payload": ids.map((id) => ({
        id,
        "value": generateUuid()
      })),
      "type": FETCH_CONFIGS
    });
  });
};
