/* eslint-disable no-magic-numbers, camelcase, no-undef, new-cap */
import "../components";
import App from "./App";
import {ConfigsReducer} from "./configs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import fetchConfigs from "./actions/fetchConfigs";

globalThis.btoa = require("abab").btoa;

export default async (req) => {
  const params = new URLSearchParams(req.search),
        ssr = params.get("ssr") !== "false",
        count = ssr ? parseInt(params.get("count") || 0, 10) : 0,
        preloadedState = await fetchConfigs(Array(count).
          fill(0).
          map((_, index) => index))((action) => ConfigsReducer()({}, action), {}),
        html = ssr ? ReactDOMServer.renderToStaticMarkup(<App count={count} preloadedState={preloadedState} />) : "",
        scriptTags = ["app.context.js", "vendors.js"].map((script) => `<script async src='${MANIFEST[script]}'></script>`).join("");
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
};

