const routes = require("next-routes")();
const getConfig = require("next/config").default;

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

routes
  .add("home", "/", "productGrid")
  .add("cart", "/cart", "cart")
  .add("checkout", "/cart/checkout", "checkout")
  .add("checkoutLogin", "/cart/login", "checkout")
  .add("checkoutComplete", "/checkout/order/:orderId", "checkoutComplete")
  .add("login", "/login", "login")
  .add("shopProduct", "/shop/:shopSlug/product/:slugOrId", "product")
  .add("product", "/product/:slugOrId/:variantId?", "product")
  .add("shop", "/shop/:shopId/:tag", "productGrid")
  .add("tag", "/tag/:slug", "tag");

module.exports = routes;
