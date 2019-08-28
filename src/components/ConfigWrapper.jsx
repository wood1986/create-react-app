import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import components from "../components";
import fetchConfigs from "../actions/fetchConfigs";

// eslint-disable-next-line react/display-name
export default React.memo((props) => {
  // eslint-disable-next-line react/prop-types
  const config = useSelector((state) => state.configs[props.id]),
        dispatch = useDispatch(),
        Component = components[config.type]();

  useEffect(() => {
    if (!config) {
      dispatch(fetchConfigs([props.id]));
    }
  }, [config]);

  if (!config || !Component) {
    return null;
  }

  return <Component {...props} {...config} />;
});
