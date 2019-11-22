import {ConfigsContext, ConfigsReducer} from "./configs";
import React, {useMemo, useReducer} from "react";
import List from "./components/List";

export default (props) => {
  // eslint-disable-next-line new-cap
  const [configs, dispatch] = useReducer(ConfigsReducer(), {}),
        contextValue = useMemo(() => ({configs, dispatch}), [configs, dispatch]);
  // eslint-disable-next-line react/prop-types
  return <ConfigsContext.Provider value={contextValue}><List count={props.count} /></ConfigsContext.Provider>;
};
