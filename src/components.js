/* eslint-disable global-require */
/* eslint-disable dot-notation */
const components = {};

components["LazyItem"] = () => import("./components/LazyItem");
components["EagerItem"] = () => Promise.resolve(require("./components/EagerItem"));

export default components;
