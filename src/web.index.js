import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import store from "./store";

const element = document.getElementById("root");

ReactDOM[element.childElementCount ? "hydrate" : "render"](<Provider store={store}></Provider>, element);
