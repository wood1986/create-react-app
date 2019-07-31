import React from "react";
import ReactDOM from "react-dom";
import Index from "./index";

const div = document.createElement("div");
div.setAttribute("id", "root");
document.body.appendChild(div);

if (document.getElementById("root").children.length) {
  ReactDOM.hydrate(<Index />, document.getElementById("root"));
} else {
  ReactDOM.render(<Index />, document.getElementById("root"));
}
