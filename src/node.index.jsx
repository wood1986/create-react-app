/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
import "./components";
import createStore from "./createStore";
import App from "./App";
import React from "react";
import ReactDOMServer from "react-dom/server";
import fetchConfigs from "./actions/fetchConfigs";

globalThis.btoa = require("abab").btoa;

export default (req) => {
  const ssr = (req.query.ssr || "").toLowerCase() !== "false",
        count = ssr ? parseInt(req.query.count || 0, 10) : 0,
        store = createStore();

  return Promise.resolve().
    then(() => store.dispatch(fetchConfigs(Array(count).
      fill(0).
      map((value, index) => index)))).
    then(() => {
      const preloadedState = store.getState(),
            html = ssr ? ReactDOMServer.renderToStaticMarkup(<App store={store} />) : "",
            scriptTags = ["web.index.js", "vendors.js"].map((script) => `<script async src='${MANIFEST[script]}'></script>`).join("");
      return `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>SSR</title>
  </head>
  <body>
    <div id="root">${html}</div>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</gu, "\\u003c")}
    </script>
    ${scriptTags}
  </body>
</html>`;
    });
};
