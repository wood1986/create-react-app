import React from "react";
import {useSelector} from "react-redux"; 

// eslint-disable-next-line react/display-name
export default (props) => {
  // eslint-disable-next-line react/prop-types
  const uuid = useSelector((state) => state.configs[props.id]);
  return <div>{uuid}</div>;
};