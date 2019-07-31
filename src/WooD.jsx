import React, {useState} from "react";
export default (props) => { // eslint-disable-line react/display-name
  const [message] = useState(props.message); // eslint-disable-line react/prop-types
  return <p>{message}</p>;
};
