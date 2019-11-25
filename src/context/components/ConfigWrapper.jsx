import React, {useContext, useEffect, useState} from "react";
import {ConfigsContext} from "../configs";
import components from "../../components";
import fetchConfigs from "../actions/fetchConfigs";

// eslint-disable-next-line react/display-name
export default React.memo((props) => {
  const [configs, dispatch] = useContext(ConfigsContext),
        // eslint-disable-next-line react/prop-types
        config = configs[props.id],
        [Component, setComponent] = useState(config && !(components[config.type] instanceof Function) ? components[config.type].default : null);

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
    } else {
      // eslint-disable-next-line react/prop-types
      fetchConfigs([props.id])(dispatch, configs);
    }
  }, [config]);

  if (!config || !Component) {
    return null;
  }

  return <Component {...props} {...config} />;
});
