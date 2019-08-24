import {Provider} from "react-redux";
import React from "react";
import store from "./store";
import List from "./components/List";

// eslint-disable-next-line react/display-name
export default () => <Provider store={store}><List count={1} /></Provider>;
