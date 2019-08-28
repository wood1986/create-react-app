import "./components";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

let element = document.getElementById("root");
const hasRoot = Boolean(element);

if (!hasRoot) {
  element = document.createElement("DIV");
  element.setAttribute("id", "root");
  document.body.appendChild(element);
}

ReactDOM[hasRoot ? "hydrate" : "render"](<App />, element);
