const routes = require("next-routes")();
const getConfig = require("next/config").default;
const defineRoutes = require("./custom/routes");

if (process.browser) {
  const { publicRuntimeConfig } = getConfig();

  const wrap = (method) => (route, params, options = {}) => {
    const { byName, urls: { as, href } } = routes.findAndGetUrls(route, params);

    // Force full page loads
    if (!publicRuntimeConfig.enableSPARouting && !options.replace) {
      window.location = as;
      return as;
    }

    // History pushstate
    return routes.Router[method](href, as, byName ? options : params);
  };

  // Override router push methods
  routes.Router.pushRoute = wrap("push");
  routes.Router.replaceRoute = wrap("replace");
  routes.Router.prefetchRoute = wrap("prefetch");
}

defineRoutes(routes);

module.exports = routes;
