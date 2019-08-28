/* eslint-disable no-magic-numbers */
import "./components";
import App from "./App";
import React from "react";
import ReactDOMServer from "react-dom/server";
import fetchConfigs from "./actions/fetchConfigs";
import store from "./store";

globalThis.btoa = require("abab").btoa;
// eslint-disable-next-line no-underscore-dangle
globalThis.__SANDBOX_PROMISE__ = store.dispatch(fetchConfigs([0, 1, 2])).
  then(() => {
    const preloadedState = store.getState(),
          html = ReactDOMServer.renderToStaticMarkup(<App />),
          scriptTags = ["web.index.js", "vendors.js"].map((script) => `<script src='${MANIFEST[script]}'></script>`).join("");

    return `
      <!DOCTYPE html>
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
      </html>
    `;
  });
