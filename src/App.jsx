import List from "./components/List";
import {Provider} from "react-redux";
import React from "react";
import store from "./store";

// eslint-disable-next-line react/display-name
export default () => <Provider store={store}><List count={Object.keys(store.getState().configs).length} /></Provider>;
