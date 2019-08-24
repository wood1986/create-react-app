import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import components from "../components";
import fetchConfigs from "../actions/fetchConfigs";

// eslint-disable-next-line react/display-name
export default (props) => {
  // eslint-disable-next-line react/prop-types
  const config = useSelector((state) => state.configs[props.id]),
        dispatch = useDispatch(),
        [Component, setComponent] = useState(null);

  useEffect(() => {
    if (!config) {
      dispatch(fetchConfigs([props.id]));
      return;
    }

    components[config.type]().then((c) => setComponent(c.default));
  });

  if (!config || !Component) {
    return null;
  }

  return <Component {...props} {...config} />;
};
