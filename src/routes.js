const routes = require("next-routes")();

routes
  .add("shopProduct", "/shop/:shopSlug/product/:productSlug", "product")
  .add("product", "/product/:productSlug", "product")
  .add("shop", "/shop/:shopId/:tag", "index")
  .add("tag", "/tag/:slug", "index");

module.exports = routes;
