import "./components";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

let element = document.getElementById("root");
if (!element) {
  element = document.createElement("DIV");
  element.setAttribute("id", "root");
  document.body.appendChild(element);
}

ReactDOM[element.childElementCount > 0 ? "hydrate" : "render"](<App />, element);
