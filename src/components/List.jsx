import ConfigWrapper from "./ConfigWrapper";
import React from "react";

export default (props) => Array(props.count).fill(0).
  map((value, index) => <ConfigWrapper key={index} id={index}/>);
