const routes = require("next-routes")();

routes
  .add("shopProduct", "/shop/:shopSlug/product/:productSlug", "product")
  .add("product", "/product/:productSlug/:variantId?", "product")
  .add("shop", "/shop/:shopId/:tag", "index")
  .add("tag", "/tag/:slug", "tag");

module.exports = routes;
