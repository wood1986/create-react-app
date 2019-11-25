/* eslint-disable no-underscore-dangle */
import "../components";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

let element = document.getElementById("context");
if (!element) {
  element = document.createElement("DIV");
  element.setAttribute("id", "context");
  document.body.appendChild(element);
}

const preloadedState = globalThis.__PRELOADED_STATE__ || {};

delete globalThis.__PRELOADED_STATE__;

const params = new globalThis.URLSearchParams(globalThis.location.search);

ReactDOM[element.childElementCount > 0 ? "hydrate" : "render"](<App preloadedState={preloadedState} count={parseInt(params.get("count") || 0, 10)}/>, element);
