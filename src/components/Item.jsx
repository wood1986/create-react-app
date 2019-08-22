import React from "react";

// eslint-disable-next-line react/display-name
export default React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
  return <div ref={ref}>{props.uuid}</div>;
});
