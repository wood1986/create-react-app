/* eslint-disable no-magic-numbers */
import "./components";
import App from "./App";
import {ChunkExtractor} from "@loadable/server";
import React from "react";
import ReactDOMServer from "react-dom/server";
import fetchConfigs from "./actions/fetchConfigs";
import path from "path";
import store from "./store";

const statsFile = path.resolve("dist/loadable-stats.json"),
      extractor = new ChunkExtractor({statsFile});

globalThis.btoa = require("abab").btoa;

store.dispatch(fetchConfigs([0, 1])).
  then(() => {
    console.log(store.getState());
    const jsx = extractor.collectChunks(<App />);
    console.log(ReactDOMServer.renderToStaticMarkup(jsx));
  });
