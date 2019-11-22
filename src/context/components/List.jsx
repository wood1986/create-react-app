import ConfigWrapper from "./ConfigWrapper";
import React from "react";

// eslint-disable-next-line react/display-name, react/prop-types
export default React.memo((props) => Array(props.count).fill(0).
  map((__, index) => <ConfigWrapper key={index} id={index}/>));
