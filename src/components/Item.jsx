import React from "react";

// eslint-disable-next-line react/display-name, react/prop-types
export default React.forwardRef((props, ref) => <div ref={ref}>{props.uuid}</div>);
