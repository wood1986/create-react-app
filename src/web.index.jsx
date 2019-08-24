import "./components";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

const root = document.createElement("DIV");
root.setAttribute("id", "root");
document.body.appendChild(root);

const element = document.getElementById("root");
ReactDOM[element.childElementCount ? "hydrate" : "render"](<App />, element);
