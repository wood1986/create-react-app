import {ConfigsContext, ConfigsReducer} from "./configs";
import React, {useMemo, useReducer} from "react";
import List from "./components/List";

// eslint-disable-next-line react/display-name
export default (props) => {
  // eslint-disable-next-line new-cap, react/prop-types
  const [configs, dispatch] = useReducer(ConfigsReducer(), props.preloadedState),
        contextValue = useMemo(() => [configs, dispatch], [configs, dispatch]);
  // eslint-disable-next-line react/prop-types
  return <ConfigsContext.Provider value={contextValue}><List count={props.count} /></ConfigsContext.Provider>;
};
