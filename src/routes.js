const routes = require("next-routes")();

routes
  .add("product", "/product/:slug", "product")
  .add("shop", "/shop/:shopId/:tag", "index")
  .add("tag", "/tag/:slug", "index");

module.exports = routes;
