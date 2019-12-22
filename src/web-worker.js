let second = 0;
setInterval(() => {
  postMessage(second++);
// eslint-disable-next-line no-magic-numbers
}, 1000);
