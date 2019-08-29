const components = {};

components.LazyItem = () => import("./components/LazyItem");
components.EagerItem = require("./components/EagerItem");

export default components;
