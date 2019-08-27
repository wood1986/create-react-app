import React, {useEffect, useRef} from "react";

const domRefs = new Map(),
      intersectionObserver = globalThis.IntersectionObserver && new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            domRefs.set(entry.target, entry);
          });
        },
        {
          "root": null,
          "threshold": [
            // eslint-disable-next-line no-magic-numbers
            ...Array(10).
              fill(0).
              map((value, index, array) => Number(index) / array.length), 1
          ]
        }
      );

// eslint-disable-next-line react/display-name, no-unused-vars
export default (Component) => (props) => {
  const domRef = useRef(null);

  useEffect(() => {
    const element = domRef.current;

    if (element) {
      intersectionObserver.observe(element);
      domRefs.set(element);
    }

    return () => {
      if (element) {
        intersectionObserver.unobserve(element);
        domRefs.delete(element);
      }
    };
  }, []);

  return <Component ref={domRef} {...props}/>;
};
