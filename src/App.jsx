/* eslint-disable no-underscore-dangle */
import List from "./components/List";
import {Provider} from "react-redux";
import React from "react";
import store from "./store";

let params = new globalThis.URLSearchParams();
if (globalThis.location) {
  params = new globalThis.URLSearchParams(globalThis.location.search);
} else if (globalThis.__SANDBOX_CTX__) {
  params = new globalThis.URLSearchParams(globalThis.__SANDBOX_CTX__.search);
}

// eslint-disable-next-line react/display-name
export default () => <Provider store={store}><List count={parseInt(params.get("count") || 0, 10)} /></Provider>;
