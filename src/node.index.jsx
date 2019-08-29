/* eslint-disable no-underscore-dangle */
/* eslint-disable no-magic-numbers */
import "./components";
import App from "./App";
import React from "react";
import ReactDOMServer from "react-dom/server";
import fetchConfigs from "./actions/fetchConfigs";
import store from "./store";

globalThis.btoa = require("abab").btoa;

const ctx = globalThis.__SANDBOX_CTX__ || {"query": {}},
      ssr = (((ctx.query || {})).ssr || "").toLowerCase() === "true";

// eslint-disable-next-line no-underscore-dangle
globalThis.__SANDBOX_PROMISE__ = Promise.resolve().
  then(() => store.dispatch(fetchConfigs(Array(ssr
    ? parseInt(ctx.query.count || 0, 10)
    : 0).fill(0).
    map((value, index) => index)))).
  then(() => {
    const preloadedState = store.getState(),
          html = ssr ? ReactDOMServer.renderToStaticMarkup(<App />) : "",
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
