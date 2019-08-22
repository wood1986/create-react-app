import React, {useEffect, useRef} from "react";

// eslint-disable-next-line react/display-name
export default (Component) => {
  // eslint-disable-next-line no-undef
  const elements = useRef(new Map()),
        intersectionObserver = useRef(new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!elements.has(entry.target)) {
              throw new Error();
            }

            elements.set(entry.target, entry);
          });
        }, {
          "root": null,
          "threshold": [...Array(10).fill(0).map((value, index, array) => Number(index) / array.length), 1]
        }));

  useEffect(() => {
    intersectionObserver.current.observe();

    return () => {
      intersectionObserver.current.unobserve();
    };
  });

  return <Component />;
};
