/* eslint-disable global-require */
/* eslint-disable dot-notation */
import lazy from "./lazy";

const components = {};

components["LazyItem"] = lazy(() => import("./components/LazyItem"));
components["EagerItem"] = () => require("./components/EagerItem").default;

export default components;
