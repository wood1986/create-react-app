/* eslint-disable no-underscore-dangle */
import List from "./components/List";
import {Provider} from "react-redux";
import React from "react";

// eslint-disable-next-line react/display-name, react/prop-types
export default (props) => <Provider store={props.store}><List count={props.count} /></Provider>;

