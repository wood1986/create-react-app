import React from "react";
import components from "../components";
import {useSelector} from "react-redux";

// eslint-disable-next-line react/display-name
export default (props) => {
  const config = useSelector((state) => state.configs[props.id]),
        Component = components[config.type];

  return <Component {...props} {...config} />;
};
