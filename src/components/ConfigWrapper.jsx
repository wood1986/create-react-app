import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import components from "../components";
import fetchConfigs from "../actions/fetchConfigs";

// eslint-disable-next-line react/display-name
export default React.memo((props) => {
  // eslint-disable-next-line react/prop-types
  const config = useSelector((state) => state.configs[props.id]),
        dispatch = useDispatch(),
        [Component, setComponent] = useState(() => {
          if (config) {
            // eslint-disable-next-line no-shadow
            const Component = components[config.type];
            return Component;
          }

          return null;
        });

  useEffect(() => {
    if (!config) {
      dispatch(fetchConfigs([props.id]));
      return;
    }

    setComponent(components[config.type]);
  }, [config]);

  if (!config || !Component) {
    return null;
  }

  return <Component {...props} {...config} />;
});
