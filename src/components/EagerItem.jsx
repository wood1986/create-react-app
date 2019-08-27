import IntersectionObserverWrapper from "./IntersectionObserverWrapper";
import React from "react";

// eslint-disable-next-line react/display-name, react/prop-types, new-cap
export default React.memo(IntersectionObserverWrapper(React.forwardRef((props, ref) => <div ref={ref}>eager: {props.value}</div>)));
