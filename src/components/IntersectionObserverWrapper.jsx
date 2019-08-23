import React, {useEffect, useRef} from "react";

const domRefs = new Map(),
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            domRefs.set(entry.target, entry);
          });
        },
        {
          "root": null,
          "threshold": [
            ...Array(10).
              fill(0).
              map((value, index, array) => Number(index) / array.length), 1
          ]    
        }
      );

// eslint-disable-next-line react/display-name
export default (Component) => {
  const domRef = useRef(null);

  useEffect(() => {
    if (domRef) {
      intersectionObserver.observe(domRef);
      domRefs.set(domRef);
    }

    return () => {
      if (domRef) {
        intersectionObserver.unobserve(domRef);
        domRefs.delete(domRef);
      }
    };
  }, []);

  return <Component ref={domRef}/>;
};
