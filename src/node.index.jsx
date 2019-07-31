import React from "react";
import ReactDOMServer from "react-dom/server";
import Index from "./index";
import pug from "pug";
import manifest from "../dist/manifest.json";

export default () => {
  const scripts = ["web.index.js", "vendors.js"].map((file) => manifest[file]),
        output = pug.render(`doctype html
html(lang='en')
  head
    title SSR
  body
    div(id='root')
      ${ReactDOMServer.renderToStaticMarkup(<Index />)}
    for script in scripts
      script(type='text/javascript' src=script)
`, {"debug": process.env.NODE_ENV !== "production", scripts}); // eslint-disable-line no-process-env
  console.log(output);
  return output;
};
