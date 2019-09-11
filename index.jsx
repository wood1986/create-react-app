import React from "react";
import ReactDOM from "react-dom";

let element = document.getElementById("root");
if (!element) {
  element = document.createElement("DIV");
  element.setAttribute("id", "root");
  document.body.appendChild(element);
}

ReactDOM.render(<p>create-react-app</p>, document.getElementById("root"));
