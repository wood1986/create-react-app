import {Provider} from "react-redux";
import React from "react";
import store from "./store";

export default () => <Provider store={store}></Provider>; // eslint-disable-line react/display-name
