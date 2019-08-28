import {useEffect, useState} from "react";

export default (lazy) => () => {
  const [Component, setComponent] = useState(null);
  useEffect(() => {
    lazy().then((component) => {
      setComponent(component.default);
    });
  });

  return Component;
};
