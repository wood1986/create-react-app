import uuidv4 from "uuid/v4";
let second = 0;
uuidv4(null, [], 0);
setInterval(() => {
  postMessage(second++);
// eslint-disable-next-line no-magic-numbers
}, 1000);
