import "../components";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import createStore from "./createStore";

let element = document.getElementById("redux");
if (!element) {
  element = document.createElement("DIV");
  element.setAttribute("id", "redux");
  document.body.appendChild(element);
}

const params = new globalThis.URLSearchParams(globalThis.location.search);

ReactDOM[element.childElementCount > 0 ? "hydrate" : "render"](<App store={createStore()} count={parseInt(params.get("count") || 0, 10)}/>, element);
