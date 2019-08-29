import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import components from "../components";
import fetchConfigs from "../actions/fetchConfigs";

// eslint-disable-next-line react/display-name
export default React.memo((props) => {
  // eslint-disable-next-line react/prop-types
  const config = useSelector((state) => state.configs[props.id]),
        dispatch = useDispatch(),
        [Component, setComponent] = useState(config && !(components[config.type] instanceof Function) ? components[config.type].default : null);

  useEffect(() => {
    dispatch(fetchConfigs([props.id]));
  }, [config]);

  useEffect(() => {
    if (config) {
      // eslint-disable-next-line no-shadow
      const Component = components[config.type];

      if (Component instanceof Function) {
        // eslint-disable-next-line new-cap
        Component().then((component) => {
          setComponent(component.default);
        });
      } else if (Component) {
        setComponent(Component.default);
      }
    }
  }, [config]);

  if (!config || !Component) {
    return null;
  }

  return <Component {...props} {...config} />;
});
